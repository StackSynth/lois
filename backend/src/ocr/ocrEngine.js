/**
 * OCR Engine — Tesseract.js wrapper with adapter pattern.
 * Swap this module for Google Cloud Vision API later.
 */
import Tesseract from 'tesseract.js';

/**
 * Perform OCR on an image file or buffer.
 * @param {string|Buffer} imageSource - File path or image buffer
 * @returns {Promise<{text: string, confidence: number, words: Array}>}
 */
export async function performOCR(imageSource) {
  try {
    const result = await Tesseract.recognize(imageSource, 'eng', {
      logger: (m) => {
        if (m.status === 'recognizing text') {
          // Progress can be tracked here
        }
      }
    });

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
