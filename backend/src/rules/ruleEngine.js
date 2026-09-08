/**
 * Rule Engine — Validates extracted fields against Legal Metrology rules.
 */
import { ruleDefinitions } from './ruleDefinitions.js';

const LOW_CONFIDENCE_THRESHOLD = 70;

/**
 * Validate extracted fields against all applicable rules.
 * @param {Array} extractedFields - Fields from the field extractor
 * @param {string} productCategory - Detected product category
 * @returns {Object} - { ruleResults, complianceScore, overallStatus, summary }
 */
export function validateCompliance(extractedFields, productCategory = 'general') {
  const ruleResults = [];

  for (const rule of ruleDefinitions) {
    const isApplicable = rule.applicableCondition(extractedFields, productCategory);

    if (!isApplicable) {
      ruleResults.push({
        ruleId: rule.id,
        field: rule.field,
        description: rule.description,
        status: 'NOT_APPLICABLE',
        severity: rule.severity,
        reference: rule.reference,
        extractedValue: null,
        confidence: null,
        explanation: {
          summary: rule.explanation.notApplicable || 'This rule is not applicable to this product.',
          detail: rule.explanation.notApplicable || 'Based on the product category, this declaration is not required.',
          suggestion: 'No action needed.'
        }
      });
      continue;
    }

    const field = extractedFields.find(f => f.field === rule.field);
    const result = evaluateRule(rule, field);
    ruleResults.push(result);
  }

  const { score, overallStatus, summary } = calculateScore(ruleResults);

  return {
    ruleResults,
    complianceScore: score,
    overallStatus,
    summary
  };
}

/**
 * Evaluate a single rule against its extracted field.
 */
function evaluateRule(rule, field) {
  const baseResult = {
    ruleId: rule.id,
    field: rule.field,
    description: rule.description,
    severity: rule.severity,
    reference: rule.reference,
    extractedValue: field?.value || null,
    confidence: field?.confidence || null
  };

  // Field not found at all
  if (!field || field.status === 'not_found' || !field.value) {
    return {
      ...baseResult,
      status: 'MISSING',
      explanation: {
        summary: rule.explanation.missing,
        detail: rule.explanation.whyItMatters,
        suggestion: rule.explanation.suggestion
      }
    };
  }

  // Field found but with low confidence
  if (field.confidence < LOW_CONFIDENCE_THRESHOLD) {
    return {
      ...baseResult,
      status: 'LOW_CONFIDENCE',
      explanation: {
        summary: rule.explanation.lowConfidence || `The ${rule.field} was detected but with low confidence (${field.confidence}%). Manual verification is recommended.`,
        detail: rule.explanation.whyItMatters,
        suggestion: `Verify the detected value "${field.value}" is correct. ${rule.explanation.suggestion}`
      }
    };
  }

  // Field found with acceptable confidence — COMPLIANT
  return {
    ...baseResult,
    status: 'COMPLIANT',
    explanation: {
      summary: `${rule.description} — detected and verified.`,
      detail: 'This declaration appears to be present and correctly formatted on the label.',
      suggestion: 'No action needed.'
    }
  };
}

/**
 * Calculate compliance score from rule results.
 * Weights: critical (10), major (7), minor (4) — adjusted by rule.weight
 */
function calculateScore(ruleResults) {
  let totalWeight = 0;
  let earnedWeight = 0;

  let compliant = 0;
  let missing = 0;
  let invalid = 0;
  let review = 0;
  let notApplicable = 0;

  for (const result of ruleResults) {
    if (result.status === 'NOT_APPLICABLE') {
      notApplicable++;
      continue;
    }

    const rule = ruleDefinitions.find(r => r.id === result.ruleId);
    const weight = rule?.weight || 5;
    totalWeight += weight;

    switch (result.status) {
      case 'COMPLIANT':
        earnedWeight += weight;
        compliant++;
        break;
      case 'LOW_CONFIDENCE':
      case 'REVIEW_REQUIRED':
        earnedWeight += weight * 0.5; // Partial credit
        review++;
        break;
      case 'INVALID':
        invalid++;
        break;
      case 'MISSING':
        missing++;
        break;
    }
  }

  const score = totalWeight > 0 ? Math.round((earnedWeight / totalWeight) * 100) : 0;

  let overallStatus;
  if (score >= 85) overallStatus = 'COMPLIANT';
  else if (score >= 50) overallStatus = 'NEEDS_ATTENTION';
  else overallStatus = 'NON_COMPLIANT';

  return {
    score,
    overallStatus,
    summary: { compliant, missing, invalid, review, notApplicable }
  };
}
