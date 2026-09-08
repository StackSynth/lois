/**
 * Scan Controller — Orchestrates the scan pipeline.
 * Image → OCR → Field Extraction → Rule Engine → Compliance Score → Report
 */
import { v4 as uuidv4 } from 'uuid';
import { performOCR } from '../ocr/ocrEngine.js';
import { extractFields, detectProductCategory } from '../extraction/fieldExtractor.js';
import { validateCompliance } from '../rules/ruleEngine.js';
import { scanStore } from '../store/scanStore.js';
import { createScan } from '../models/Scan.js';
import { demoProducts } from '../demo/demoData.js';

/**
 * POST /api/scan — Full pipeline: image → OCR → extract → validate → store
 */
export async function scanImage(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: { message: 'No image file provided' } });
    }

    const scanId = uuidv4();
    const imageUrl = `/uploads/${req.file.filename}`;

    // Step 1: OCR
    const ocrResult = await performOCR(req.file.path);

    // Step 2: Extract fields
    const extractedFields = extractFields(ocrResult.text);

    // Step 3: Detect product category
    const category = detectProductCategory(ocrResult.text);

    // Step 4: Validate against rules
    const { ruleResults, complianceScore, overallStatus, summary } = validateCompliance(extractedFields, category);

    // Step 5: Determine product name
    const productNameField = extractedFields.find(f => f.field === 'productName');
    const productName = productNameField?.value || 'Unknown Product';

    // Step 6: Store result
    const scan = createScan({
      id: scanId,
      productName,
      timestamp: new Date().toISOString(),
      imageUrl,
      ocrResult: {
        text: ocrResult.text,
        confidence: ocrResult.confidence
      },
      extractedFields,
      ruleResults,
      complianceScore,
      overallStatus,
      isDemo: false,
      summary
    });

    scanStore.create(scan);

    res.json({ success: true, data: scan });
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/ocr — OCR only (no validation)
 */
export async function ocrOnly(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: { message: 'No image file provided' } });
    }

    const ocrResult = await performOCR(req.file.path);
    const extractedFields = extractFields(ocrResult.text);

    res.json({
      success: true,
      data: {
        ocrResult,
        extractedFields
      }
    });
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/validate — Validate pre-extracted fields (no OCR)
 */
export async function validateFields(req, res, next) {
  try {
    const { extractedFields, category } = req.body;

    if (!extractedFields || !Array.isArray(extractedFields)) {
      return res.status(400).json({ error: { message: 'extractedFields array is required' } });
    }

    const result = validateCompliance(extractedFields, category || 'general');
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/scans — List all scans
 */
export function getScans(req, res) {
  const { search, status, isDemo } = req.query;
  const filters = {};

  if (search) filters.search = search;
  if (status) filters.status = status;
  if (isDemo !== undefined) filters.isDemo = isDemo === 'true';

  const scans = scanStore.findAll(filters);

  res.json({
    success: true,
    data: scans,
    total: scans.length
  });
}

/**
 * GET /api/scans/:id — Get single scan detail
 */
export function getScanById(req, res) {
  const scan = scanStore.findById(req.params.id);

  if (!scan) {
    return res.status(404).json({ error: { message: 'Scan not found' } });
  }

  res.json({ success: true, data: scan });
}

/**
 * POST /api/demo/:demoId — Run demo product pipeline (bypasses OCR)
 */
export function runDemo(req, res) {
  const { demoId } = req.params;
  const demoProduct = demoProducts[demoId];

  if (!demoProduct) {
    return res.status(404).json({
      error: { message: `Demo product "${demoId}" not found. Available: demo-a, demo-b, demo-c` }
    });
  }

  const scanId = `${demoId}-${Date.now()}`;

  // Run rule engine on demo data
  const { ruleResults, complianceScore, overallStatus, summary } = validateCompliance(
    demoProduct.extractedFields,
    demoProduct.category
  );

  const scan = createScan({
    id: scanId,
    productName: demoProduct.name,
    timestamp: new Date().toISOString(),
    imageUrl: null,
    ocrResult: {
      text: demoProduct.ocrText,
      confidence: 95
    },
    extractedFields: demoProduct.extractedFields,
    ruleResults,
    complianceScore,
    overallStatus,
    isDemo: true,
    summary
  });

  scanStore.create(scan);

  res.json({ success: true, data: scan });
}
