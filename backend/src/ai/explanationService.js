const MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models';
const REQUEST_TIMEOUT_MS = Number(process.env.GEMINI_TIMEOUT_MS || 12000);

const EMPTY_EXPLANATION = {
  overallAssessment: 'REVIEW',
  summary: 'The AI explanation could not be generated. Review the extracted fields and rule results below.',
  detectedInformation: [],
  issues: [],
  passedChecks: [],
  reviewChecks: [],
  recommendations: ['Review the extracted declarations and configured Legal Metrology requirement before finalizing the assessment.'],
  inspectorNote: 'Manual inspection is required because an AI explanation was not available.',
  userExplanation: 'The image was processed, but the AI explanation is unavailable. Review the field-level results and verify any items marked for review.',
  source: 'fallback'
};

function cleanJson(text) {
  const withoutFence = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
  const start = withoutFence.indexOf('{');
  const end = withoutFence.lastIndexOf('}');
  if (start < 0 || end <= start) throw new Error('Gemini returned no JSON object');
  return JSON.parse(withoutFence.slice(start, end + 1));
}

function normalizeExplanation(value, source = 'gemini') {
  const allowedAssessments = new Set(['PASS', 'REVIEW', 'FAIL']);
  const list = (items) => Array.isArray(items) ? items : [];
  return {
    ...EMPTY_EXPLANATION,
    ...value,
    overallAssessment: allowedAssessments.has(value?.overallAssessment) ? value.overallAssessment : 'REVIEW',
    detectedInformation: list(value?.detectedInformation),
    issues: list(value?.issues),
    passedChecks: list(value?.passedChecks),
    reviewChecks: list(value?.reviewChecks),
    recommendations: list(value?.recommendations)?.length
      ? list(value?.recommendations)
      : EMPTY_EXPLANATION.recommendations,
    source
  };
}

/**
 * Always-available explanation built from rule-engine results so the UI
 * never waits on Gemini and always has AI analysis content to show.
 */
export function buildLocalExplanation({ product, extractedFields, ruleResults }) {
  const issues = [];
  const passedChecks = [];
  const reviewChecks = [];
  const recommendations = [];

  for (const rule of ruleResults || []) {
    if (rule.status === 'NOT_APPLICABLE') continue;

    if (rule.status === 'COMPLIANT') {
      passedChecks.push({
        field: rule.field || rule.description,
        reason: rule.explanation?.summary || `${rule.description} looks compliant.`
      });
      continue;
    }

    if (['MISSING', 'INVALID'].includes(rule.status)) {
      issues.push({
        field: rule.field || rule.description,
        status: 'FAIL',
        reason: rule.explanation?.summary || `${rule.description} needs attention.`,
        evidence: rule.extractedValue || 'Not detected',
        recommendation: rule.explanation?.suggestion || 'Verify the label and update the declaration if required.',
        ruleReference: rule.reference
      });
      if (rule.explanation?.suggestion) recommendations.push(rule.explanation.suggestion);
      continue;
    }

    reviewChecks.push({
      field: rule.field || rule.description,
      reason: rule.explanation?.summary || `${rule.description} should be reviewed.`
    });
    issues.push({
      field: rule.field || rule.description,
      status: 'REVIEW',
      reason: rule.explanation?.summary || `${rule.description} should be reviewed.`,
      evidence: rule.extractedValue || 'Low confidence / unclear',
      recommendation: rule.explanation?.suggestion || 'Re-check this declaration on the physical label.',
      ruleReference: rule.reference
    });
    if (rule.explanation?.suggestion) recommendations.push(rule.explanation.suggestion);
  }

  const failCount = issues.filter((i) => i.status === 'FAIL').length;
  const reviewCount = reviewChecks.length;
  let overallAssessment = 'PASS';
  if (failCount > 0) overallAssessment = 'FAIL';
  else if (reviewCount > 0) overallAssessment = 'REVIEW';

  const productName = product?.name || 'this product';
  const category = product?.category || 'general';

  const summaryParts = [
    `AI analysis for ${productName} (${category}):`,
    `${passedChecks.length} declaration(s) look compliant`,
    reviewCount ? `${reviewCount} need review` : null,
    failCount ? `${failCount} missing or invalid` : null
  ].filter(Boolean);

  const userExplanation = failCount || reviewCount
    ? `Jarvis reviewed the extracted label fields for ${productName}. ${failCount ? `${failCount} required declaration(s) appear missing or invalid. ` : ''}${reviewCount ? `${reviewCount} item(s) need manual review. ` : ''}Open the AI-Assisted Explanation section for field-level details.`
    : `Jarvis reviewed the extracted label fields for ${productName}. Required declarations look compliant based on the configured Legal Metrology checks. Still verify the physical label before finalizing.`;

  const detectedInformation = (extractedFields || [])
    .filter((f) => f.value)
    .map((f) => ({
      field: f.label || f.field,
      value: f.value,
      confidence: f.confidence ?? null
    }));

  const uniqueRecommendations = [...new Set(recommendations)].slice(0, 6);
  if (!uniqueRecommendations.length) {
    uniqueRecommendations.push('Confirm the physical label matches the extracted values before signing off.');
  }

  return normalizeExplanation({
    overallAssessment,
    summary: summaryParts.join(' '),
    detectedInformation,
    issues,
    passedChecks,
    reviewChecks,
    recommendations: uniqueRecommendations,
    inspectorNote: overallAssessment === 'PASS'
      ? 'Rule checks passed. Spot-check the physical label for OCR accuracy.'
      : 'Priority: resolve FAIL items first, then review low-confidence fields.',
    userExplanation
  }, 'local');
}

function buildPrompt({ product, extractedFields, ruleResults }) {
  return `You are Jarvis AI Compliance Assistant. Analyze only the supplied application results. Do not perform OCR, replace the rule engine, invent product facts, legal clauses, or rule numbers, and do not certify legal compliance.

Return ONLY valid JSON with exactly these keys:
overallAssessment (PASS | REVIEW | FAIL), summary, detectedInformation (array of {field,value,confidence}), issues (array of {field,status,reason,evidence,recommendation,ruleReference}), passedChecks (array of {field,reason}), reviewChecks (array of {field,reason}), recommendations (array of strings), inspectorNote, userExplanation.

For missing fields, say the declaration was not detected and advise verifying whether it applies and checking the configured Legal Metrology requirement. If an exact rule or clause is not supplied, use: "Applicable Legal Metrology requirement should be verified against the configured rule set." Distinguish PASS, REVIEW, and FAIL. Mention low-confidence results. Keep language simple and do not claim certification.

APPLICATION RESULTS:
${JSON.stringify({ product, extractedFields, ruleResults })}`;
}

async function callGemini({ product, extractedFields, ruleResults }) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  let timeout;
  try {
    const controller = new AbortController();
    timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    const response = await fetch(`${API_URL}/${MODEL}:generateContent?key=${encodeURIComponent(apiKey)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        contents: [{ parts: [{ text: buildPrompt({ product, extractedFields, ruleResults }) }] }],
        generationConfig: { temperature: 0.1, responseMimeType: 'application/json' }
      })
    });
    if (!response.ok) {
      const details = await response.text();
      throw new Error(`Gemini request failed (${response.status}): ${details.slice(0, 300)}`);
    }

    const payload = await response.json();
    const text = payload.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error('Gemini returned an empty response');
    return normalizeExplanation(cleanJson(text), 'gemini');
  } finally {
    clearTimeout(timeout);
  }
}

export async function generateExplanation({ product, extractedFields, ruleResults }) {
  const local = buildLocalExplanation({ product, extractedFields, ruleResults });

  if (!process.env.GEMINI_API_KEY) {
    return {
      ...local,
      summary: `${local.summary} (Gemini is not configured — showing local AI analysis.)`
    };
  }

  try {
    const gemini = await callGemini({ product, extractedFields, ruleResults });
    // Prefer Gemini wording but keep local issues if Gemini returned an empty set
    return {
      ...gemini,
      issues: gemini.issues?.length ? gemini.issues : local.issues,
      passedChecks: gemini.passedChecks?.length ? gemini.passedChecks : local.passedChecks,
      reviewChecks: gemini.reviewChecks?.length ? gemini.reviewChecks : local.reviewChecks,
      detectedInformation: gemini.detectedInformation?.length ? gemini.detectedInformation : local.detectedInformation,
      recommendations: gemini.recommendations?.length ? gemini.recommendations : local.recommendations,
      userExplanation: gemini.userExplanation || local.userExplanation
    };
  } catch (error) {
    const message = error.name === 'AbortError'
      ? `request timed out after ${REQUEST_TIMEOUT_MS}ms`
      : error.message;
    console.error('AI explanation unavailable, using local analysis:', message);
    return {
      ...local,
      summary: `${local.summary} (Live AI model unavailable — showing local analysis.)`
    };
  }
}
