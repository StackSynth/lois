/**
 * OCR Engine — Gemini Vision primary, Tesseract fallback.
 * Large phone photos often stall Tesseract past 45s; Gemini is fast for label text.
 */
import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import sharp from 'sharp';
import Tesseract from 'tesseract.js';

const OCR_TIMEOUT_MS = Number(process.env.OCR_TIMEOUT_MS || 90000);
const GEMINI_OCR_TIMEOUT_MS = Number(process.env.GEMINI_OCR_TIMEOUT_MS || 25000);
const MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models';
const MAX_OCR_EDGE = Number(process.env.OCR_MAX_EDGE || 1600);
const MAX_INLINE_BYTES = 3.5 * 1024 * 1024;

let sharedWorker = null;
let workerReady = null;

function withTimeout(promise, ms, label) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

function mimeFromPath(filePath) {
  const ext = path.extname(filePath || '').toLowerCase();
  if (ext === '.png') return 'image/png';
  if (ext === '.webp') return 'image/webp';
  if (ext === '.bmp') return 'image/bmp';
  if (ext === '.gif') return 'image/gif';
  return 'image/jpeg';
}

/**
 * Downscale / recompress large camera photos so OCR stays fast.
 * Returns a temp JPEG path when rewrite is needed, else the original path.
 */
async function prepareImageForOCR(imagePath) {
  if (typeof imagePath !== 'string') {
    return { path: imagePath, cleanup: null, mimeType: 'image/jpeg' };
  }

  const original = await fs.readFile(imagePath);
  const meta = await sharp(original).metadata();
  const longest = Math.max(meta.width || 0, meta.height || 0);
  const needsResize = longest > MAX_OCR_EDGE || original.length > MAX_INLINE_BYTES;

  if (!needsResize) {
    return { path: imagePath, cleanup: null, mimeType: mimeFromPath(imagePath), buffer: original };
  }

  const prepared = await sharp(original)
    .rotate() // honor EXIF orientation
    .resize({
      width: MAX_OCR_EDGE,
      height: MAX_OCR_EDGE,
      fit: 'inside',
      withoutEnlargement: true
    })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();

  const tempPath = path.join(os.tmpdir(), `ocr-${Date.now()}-${Math.round(Math.random() * 1e9)}.jpg`);
  await fs.writeFile(tempPath, prepared);
  console.log(`OCR image prepared: ${Math.round(original.length / 1024)}KB -> ${Math.round(prepared.length / 1024)}KB`);

  return {
    path: tempPath,
    cleanup: async () => {
      try { await fs.unlink(tempPath); } catch { /* ignore */ }
    },
    mimeType: 'image/jpeg',
    buffer: prepared
  };
}

async function resetWorker() {
  if (sharedWorker) {
    try {
      await sharedWorker.terminate();
    } catch {
      // ignore terminate errors
    }
  }
  sharedWorker = null;
  workerReady = null;
}

/**
 * Preload Tesseract worker + language data so the first scan is not cold.
 */
export async function warmOCR() {
  if (workerReady) return workerReady;

  workerReady = (async () => {
    const worker = await Tesseract.createWorker('eng', 1, { logger: () => {} });
    await worker.setParameters({
      tessedit_pageseg_mode: Tesseract.PSM.SINGLE_BLOCK,
      preserve_interword_spaces: '1'
    });
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

async function performGeminiOCR({ buffer, mimeType }) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not configured');
  if (!buffer?.length) throw new Error('No image buffer for Gemini OCR');
  if (buffer.length > MAX_INLINE_BYTES) {
    throw new Error(`Image still too large for Gemini OCR (${Math.round(buffer.length / 1024 / 1024)}MB)`);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), GEMINI_OCR_TIMEOUT_MS);

  try {
    const response = await fetch(`${API_URL}/${MODEL}:generateContent?key=${encodeURIComponent(apiKey)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        contents: [{
          parts: [
            {
              text: `Extract all readable text from this packaged commodity product label.
Return ONLY the extracted text, preserving line breaks where useful.
Do not summarize, translate, or invent missing text.`
            },
            {
              inline_data: {
                mime_type: mimeType || 'image/jpeg',
                data: buffer.toString('base64')
              }
            }
          ]
        }],
        generationConfig: { temperature: 0.1 }
      })
    });

    if (!response.ok) {
      const details = await response.text();
      throw new Error(`Gemini OCR failed (${response.status}): ${details.slice(0, 300)}`);
    }

    const payload = await response.json();
    const text = payload.candidates?.[0]?.content?.parts?.map((p) => p.text).filter(Boolean).join('\n').trim() || '';
    if (!text) throw new Error('Gemini OCR returned empty text');

    return {
      text,
      confidence: 88,
      words: text.split(/\s+/).filter(Boolean).map((w) => ({ text: w, confidence: 88, bbox: null })),
      engine: 'gemini'
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function performTesseractOCR(imageSource) {
  let worker;
  try {
    worker = await withTimeout(warmOCR(), Math.min(OCR_TIMEOUT_MS, 30000), 'OCR warm-up');
  } catch {
    worker = null;
  }

  try {
    const result = worker
      ? await withTimeout(worker.recognize(imageSource), OCR_TIMEOUT_MS, 'OCR')
      : await withTimeout(
          Tesseract.recognize(imageSource, 'eng', { logger: () => {} }),
          OCR_TIMEOUT_MS,
          'OCR'
        );

    const { data } = result;
    return {
      text: data.text || '',
      confidence: data.confidence || 0,
      words: (data.words || []).map((w) => ({
        text: w.text,
        confidence: w.confidence,
        bbox: w.bbox
      })),
      engine: 'tesseract'
    };
  } catch (error) {
    await resetWorker();
    throw error;
  }
}

/**
 * Perform OCR on an image file or buffer.
 * @param {string|Buffer} imageSource - File path or image buffer
 * @returns {Promise<{text: string, confidence: number, words: Array, engine?: string}>}
 */
export async function performOCR(imageSource) {
  const started = Date.now();
  const errors = [];
  let prepared = { path: imageSource, cleanup: null, mimeType: 'image/jpeg', buffer: null };

  try {
    if (typeof imageSource === 'string') {
      prepared = await prepareImageForOCR(imageSource);
    } else if (Buffer.isBuffer(imageSource)) {
      prepared.buffer = imageSource;
    }

    if (process.env.GEMINI_API_KEY && prepared.buffer) {
      try {
        const result = await performGeminiOCR({
          buffer: prepared.buffer,
          mimeType: prepared.mimeType
        });
        console.log(`OCR (gemini) completed in ${Date.now() - started}ms`);
        return result;
      } catch (error) {
        const message = error.name === 'AbortError'
          ? `Gemini OCR timed out after ${GEMINI_OCR_TIMEOUT_MS}ms`
          : error.message;
        console.warn('Gemini OCR unavailable, falling back to Tesseract:', message);
        errors.push(message);
      }
    }

    const result = await performTesseractOCR(prepared.path);
    console.log(`OCR (tesseract) completed in ${Date.now() - started}ms`);
    return result;
  } catch (error) {
    console.error('OCR Engine Error:', error);
    const detail = errors.length
      ? `${error.message} (also: ${errors.join('; ')})`
      : error.message;
    throw new Error(`OCR processing failed: ${detail}`);
  } finally {
    if (prepared.cleanup) await prepared.cleanup();
  }
}

/**
 * OCR adapter interface for future providers (e.g., Google Cloud Vision).
 */
export const ocrAdapters = {
  tesseract: performTesseractOCR,
  gemini: async (imagePath) => {
    const prepared = await prepareImageForOCR(imagePath);
    try {
      return await performGeminiOCR(prepared);
    } finally {
      if (prepared.cleanup) await prepared.cleanup();
    }
  }
};

export function getOCREngine(provider = 'tesseract') {
  const engine = ocrAdapters[provider];
  if (!engine) throw new Error(`Unknown OCR provider: ${provider}`);
  return engine;
}
