/**
 * Scan data model — PostgreSQL-ready structure.
 * Currently used as a schema reference for the in-memory store.
 */

/**
 * @typedef {Object} ExtractedField
 * @property {string} field - Field identifier (e.g., 'mrp', 'netQuantity')
 * @property {string} label - Human-readable label
 * @property {string|null} value - Extracted value or null if not found
 * @property {number} confidence - Confidence percentage (0-100)
 * @property {string} status - 'found' | 'not_found' | 'low_confidence'
 */

/**
 * @typedef {Object} RuleResult
 * @property {string} ruleId - Rule identifier
 * @property {string} field - Field this rule checks
 * @property {string} description - Rule description
 * @property {string} status - COMPLIANT | MISSING | INVALID | LOW_CONFIDENCE | NOT_APPLICABLE | REVIEW_REQUIRED
 * @property {string} severity - critical | major | minor
 * @property {string} reference - Legal reference
 * @property {string|null} extractedValue - The value that was checked
 * @property {number|null} confidence - Confidence of the extracted value
 * @property {Object} explanation - AI-style explanation
 * @property {string} explanation.summary - Short summary
 * @property {string} explanation.detail - Detailed explanation
 * @property {string} explanation.suggestion - Suggested correction
 */

/**
 * @typedef {Object} Scan
 * @property {string} id - UUID
 * @property {string} productName - Detected product name
 * @property {string} timestamp - ISO timestamp
 * @property {string|null} imageUrl - Path to uploaded image
 * @property {string|null} pdfData - Generated compliance report as a data URL
 * @property {Object} ocrResult - Raw OCR output
 * @property {string} ocrResult.text - Full OCR text
 * @property {number} ocrResult.confidence - Overall OCR confidence
 * @property {ExtractedField[]} extractedFields - Structured extracted fields
 * @property {RuleResult[]} ruleResults - Rule validation results
 * @property {number} complianceScore - 0-100 score
 * @property {string} overallStatus - COMPLIANT | NEEDS_ATTENTION | NON_COMPLIANT
 * @property {boolean} isDemo - Whether this is demo data
 * @property {Object} summary - Compliance summary counts
 * @property {Object|null} aiExplanation - AI explanation based on extracted fields and rule results
 * @property {number} summary.compliant - Count of compliant rules
 * @property {number} summary.missing - Count of missing fields
 * @property {number} summary.invalid - Count of invalid fields
 * @property {number} summary.review - Count of fields needing review
 * @property {number} summary.notApplicable - Count of N/A rules
 */

export function createScan(data) {
  return {
    id: data.id,
    productName: data.productName || 'Unknown Product',
    timestamp: data.timestamp || new Date().toISOString(),
    imageUrl: data.imageUrl || null,
    pdfData: data.pdfData || null,
    ocrResult: data.ocrResult || { text: '', confidence: 0 },
    extractedFields: data.extractedFields || [],
    ruleResults: data.ruleResults || [],
    complianceScore: data.complianceScore ?? 0,
    overallStatus: data.overallStatus || 'NON_COMPLIANT',
    isDemo: data.isDemo || false,
    summary: data.summary || { compliant: 0, missing: 0, invalid: 0, review: 0, notApplicable: 0 },
    aiExplanation: data.aiExplanation || null
  };
}
