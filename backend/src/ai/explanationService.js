const MODEL = process.env.GEMINI_MODEL || 'gemini-3.6-flash';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

const EMPTY_EXPLANATION = {
  overallAssessment: 'REVIEW',
  summary: 'The AI explanation could not be generated. Review the extracted fields and rule results below.',
  detectedInformation: [],
  issues: [],
  passedChecks: [],
  reviewChecks: [],
  recommendations: ['Review the extracted declarations and configured Legal Metrology requirement before finalizing the assessment.'],
  inspectorNote: 'Manual inspection is required because an AI explanation was not available.',
  userExplanation: 'The image was processed, but the AI explanation is unavailable. Review the field-level results and verify any items marked for review.'
};

function cleanJson(text) {
  const withoutFence = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
  const start = withoutFence.indexOf('{');
  const end = withoutFence.lastIndexOf('}');
  if (start < 0 || end <= start) throw new Error('Gemini returned no JSON object');
  return JSON.parse(withoutFence.slice(start, end + 1));
}

function normalizeExplanation(value) {
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
    recommendations: list(value?.recommendations)
  };
}

function buildPrompt({ product, extractedFields, ruleResults }) {
  return `You are Jarvis AI Compliance Assistant. Analyze only the supplied application results. Do not perform OCR, replace the rule engine, invent product facts, legal clauses, or rule numbers, and do not certify legal compliance.

Return ONLY valid JSON with exactly these keys:
overallAssessment (PASS | REVIEW | FAIL), summary, detectedInformation (array of {field,value,confidence}), issues (array of {field,status,reason,evidence,recommendation,ruleReference}), passedChecks (array of {field,reason}), reviewChecks (array of {field,reason}), recommendations (array of strings), inspectorNote, userExplanation.

For missing fields, say the declaration was not detected and advise verifying whether it applies and checking the configured Legal Metrology requirement. If an exact rule or clause is not supplied, use: "Applicable Legal Metrology requirement should be verified against the configured rule set." Distinguish PASS, REVIEW, and FAIL. Mention low-confidence results. Keep language simple and do not claim certification.

APPLICATION RESULTS:
${JSON.stringify({ product, extractedFields, ruleResults })}`;
}

export async function generateExplanation({ product, extractedFields, ruleResults }) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return { ...EMPTY_EXPLANATION, summary: 'AI explanation is not configured. Review the extracted fields and rule results below.' };

  try {
    const response = await fetch(`${API_URL}/${MODEL}:generateContent?key=${encodeURIComponent(apiKey)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
    return normalizeExplanation(cleanJson(text));
  } catch (error) {
    console.error('AI explanation unavailable:', error.message);
    return { ...EMPTY_EXPLANATION, summary: 'The AI explanation could not be generated. Review the extracted fields and rule results below.' };
  }
}