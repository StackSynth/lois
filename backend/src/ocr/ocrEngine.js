/**
 * OCR Engine — Tesseract.js wrapper with adapter pattern.
 * Swap this module for Google Cloud Vision API later.
 */
import Tesseract from 'tesseract.js';

const OCR_TIMEOUT_MS = Number(process.env.OCR_TIMEOUT_MS || 45000);

let sharedWorker = null;
let workerReady = null;

function withTimeout(promise, ms, label) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

/**
 * Preload Tesseract worker + language data so the first scan is not cold.
 */
export async function warmOCR() {
  if (workerReady) return workerReady;
  workerReady = (async () => {
    const worker = await Tesseract.createWorker('eng', 1, { logger: () => {} });
    sharedWorker = worker;
    return worker;
  })().catch((error) => {
    workerReady = null;
    sharedWorker = null;
    console.error('OCR warm-up failed:', error.message);
    throw error;
  });
  return workerReady;
}

/**
 * Perform OCR on an image file or buffer.
 * @param {string|Buffer} imageSource - File path or image buffer
 * @returns {Promise<{text: string, confidence: number, words: Array}>}
 */
export async function performOCR(imageSource) {
  try {
    let worker;
    try {
      worker = await withTimeout(warmOCR(), Math.min(OCR_TIMEOUT_MS, 20000), 'OCR warm-up');
    } catch {
      // Fall back to one-shot recognize if warm worker failed
      worker = null;
    }

    const result = worker
      ? await withTimeout(worker.recognize(imageSource), OCR_TIMEOUT_MS, 'OCR')
      : await withTimeout(
          Tesseract.recognize(imageSource, 'eng', { logger: () => {} }),
          OCR_TIMEOUT_MS,
          'OCR'
        );

    const { data } = result;

    const words = (data.words || []).map(w => ({
      text: w.text,
      confidence: w.confidence,
      bbox: w.bbox
    }));

    return {
      text: data.text || '',
      confidence: data.confidence || 0,
      words
    };
  } catch (error) {
    console.error('OCR Engine Error:', error);
    throw new Error(`OCR processing failed: ${error.message}`);
  }
}

/**
 * OCR adapter interface for future providers (e.g., Google Cloud Vision).
 */
export const ocrAdapters = {
  tesseract: performOCR,
  // googleVision: async (imageSource) => { /* Future implementation */ }
};

export function getOCREngine(provider = 'tesseract') {
  const engine = ocrAdapters[provider];
  if (!engine) throw new Error(`Unknown OCR provider: ${provider}`);
  return engine;
}
