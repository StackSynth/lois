/**
 * OCR Engine — Gemini Vision primary, Tesseract fallback.
 * On Vercel, only Gemini is used (Tesseract exceeds serverless limits).
 */
import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import { createHash } from 'crypto';
import sharp from 'sharp';
import { resolveGeminiModel, geminiGenerateUrl } from '../ai/geminiConfig.js';

// Vercel function maxDuration is 60s — leave room for AI explanation after OCR.
const OCR_TIMEOUT_MS = Number(process.env.OCR_TIMEOUT_MS || 30000);
const GEMINI_OCR_TIMEOUT_MS = Number(process.env.GEMINI_OCR_TIMEOUT_MS || 28000);
const GEMINI_OCR_RETRY_TIMEOUT_MS = Number(process.env.GEMINI_OCR_RETRY_TIMEOUT_MS || 18000);
const OCR_WARMUP_TIMEOUT_MS = Number(process.env.OCR_WARMUP_TIMEOUT_MS || 8000);
const MODEL = resolveGeminiModel();
const MAX_OCR_EDGE = Number(process.env.OCR_MAX_EDGE || 1024);
const FAST_OCR_EDGE = Number(process.env.OCR_FAST_EDGE || 768);
const MAX_INLINE_BYTES = 2 * 1024 * 1024;
// Vercel functions should use the external Gemini Vision request only. Local
// Tesseract is CPU-heavy, suffers cold starts, and is unsuitable as a
// serverless fallback. It remains available for local development.
const SHOULD_USE_TESSERACT = process.env.OCR_FALLBACK_TESSERACT === 'true'
  || (!process.env.VERCEL && process.env.OCR_FALLBACK_TESSERACT !== 'false');

let sharedWorker = null;
let workerReady = null;
let tesseractModule = null;

async function getTesseract() {
  if (!tesseractModule) {
    ({ default: tesseractModule } = await import('tesseract.js'));
  }
  return tesseractModule;
}

function withTimeout(promise, ms, label) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

function isAbortError(error) {
  return error?.name === 'AbortError' || /timed out after/i.test(error?.message || '');
}

function errorDetails(error) {
  return {
    name: error?.name,
    message: error?.message,
    cause: error?.cause instanceof Error ? error.cause.message : error?.cause,
    stack: error?.stack
  };
}

function logGeminiOCR(event, details = {}) {
  console.info(`[gemini-ocr] ${event}`, JSON.stringify({
    timestamp: new Date().toISOString(),
    ...details
  }));
}

/**
 * Always produce a lean JPEG for Gemini — phone photos are otherwise too large
 * and Vision requests frequently exceed short abort windows.
 */
async function compressForOCR(imageSource, { maxEdge = MAX_OCR_EDGE, quality = 72 } = {}) {
  const input = typeof imageSource === 'string'
    ? await fs.readFile(imageSource)
    : imageSource;

  const prepared = await sharp(input)
    .rotate()
    .resize({
      width: maxEdge,
      height: maxEdge,
      fit: 'inside',
      withoutEnlargement: true
    })
    .jpeg({ quality, mozjpeg: true })
    .toBuffer();

  // If still huge, compress harder once more
  if (prepared.length > MAX_INLINE_BYTES) {
    return sharp(prepared)
      .resize({ width: FAST_OCR_EDGE, height: FAST_OCR_EDGE, fit: 'inside' })
      .jpeg({ quality: 60, mozjpeg: true })
      .toBuffer();
  }

  return prepared;
}

async function prepareImageForOCR(imagePath, options = {}) {
  const buffer = await compressForOCR(imagePath, options);
  const tempPath = path.join(os.tmpdir(), `ocr-${Date.now()}-${Math.round(Math.random() * 1e9)}.jpg`);
  await fs.writeFile(tempPath, buffer);

  const originalBytes = typeof imagePath === 'string'
    ? (await fs.stat(imagePath)).size
    : imagePath.length;
  console.log(`OCR image prepared: ${Math.round(originalBytes / 1024)}KB -> ${Math.round(buffer.length / 1024)}KB (edge<=${options.maxEdge || MAX_OCR_EDGE})`);

  return {
    path: tempPath,
    cleanup: async () => {
      try { await fs.unlink(tempPath); } catch { /* ignore */ }
    },
    mimeType: 'image/jpeg',
    buffer
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
 * Preload Tesseract worker + language data so the first local scan is not cold.
 */
export async function warmOCR() {
  if (!SHOULD_USE_TESSERACT) return null;
  if (workerReady) return workerReady;

  workerReady = (async () => {
    const Tesseract = await getTesseract();
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

async function performGeminiOCR({ buffer, mimeType }, timeoutMs = GEMINI_OCR_TIMEOUT_MS) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not configured');
  if (!buffer?.length) throw new Error('No image buffer for Gemini OCR');
  if (buffer.length > MAX_INLINE_BYTES) {
    throw new Error(`Image still too large for Gemini OCR (${Math.round(buffer.length / 1024 / 1024)}MB)`);
  }

  const imageBase64 = buffer.toString('base64');
  const decodedImage = Buffer.from(imageBase64, 'base64');
  if (decodedImage.length !== buffer.length || !decodedImage.equals(buffer)) {
    throw new Error('Gemini OCR image base64 validation failed');
  }

  const requestBody = JSON.stringify({
    contents: [{
      parts: [
        {
          text: 'Extract all readable text from this product label. Return only the raw text with line breaks. Do not invent text.'
        },
        {
          inlineData: {
            mimeType: mimeType || 'image/jpeg',
            data: imageBase64
          }
        }
      ]
    }],
    generationConfig: {
      temperature: 0,
      maxOutputTokens: 2048
    }
  });
  const requestUrl = geminiGenerateUrl(MODEL, apiKey);
  const safeRequestUrl = requestUrl.replace(/([?&]key=)[^&]*/i, '$1[redacted]');
  const requestStartedAt = Date.now();
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    logGeminiOCR('abort-requested', { elapsedMs: Date.now() - requestStartedAt, timeoutMs });
    controller.abort(new Error(`Gemini OCR timed out after ${timeoutMs}ms`));
  }, timeoutMs);
  controller.signal.addEventListener('abort', () => {
    logGeminiOCR('abort-signal-fired', {
      elapsedMs: Date.now() - requestStartedAt,
      reason: String(controller.signal.reason?.message || controller.signal.reason || '')
    });
  }, { once: true });

  try {
    logGeminiOCR('request-start', {
      model: MODEL,
      url: safeRequestUrl,
      headers: { 'content-type': 'application/json', apiKey: '[redacted in query string]' },
      imageMimeType: mimeType || 'image/jpeg',
      imageBytes: buffer.length,
      imageBase64Bytes: Buffer.byteLength(imageBase64),
      imageSha256: createHash('sha256').update(buffer).digest('hex'),
      requestBodyBytes: Buffer.byteLength(requestBody)
    });
    const response = await fetch(requestUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: requestBody
    });
    logGeminiOCR('response-received', {
      elapsedMs: Date.now() - requestStartedAt,
      status: response.status,
      ok: response.ok
    });

    if (!response.ok) {
      const details = await response.text();
      logGeminiOCR('response-error', {
        elapsedMs: Date.now() - requestStartedAt,
        status: response.status,
        details: details.slice(0, 1000)
      });
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
  } catch (error) {
    console.error('[gemini-ocr] request-failed', JSON.stringify({
      timestamp: new Date().toISOString(),
      elapsedMs: Date.now() - requestStartedAt,
      aborted: controller.signal.aborted,
      error: errorDetails(error)
    }));
    throw error;
  } finally {
    clearTimeout(timeout);
    logGeminiOCR('request-finished', {
      elapsedMs: Date.now() - requestStartedAt,
      aborted: controller.signal.aborted
    });
  }
}

async function performTesseractOCR(imageSource) {
  let worker;
  try {
    worker = await withTimeout(warmOCR(), Math.min(OCR_TIMEOUT_MS, OCR_WARMUP_TIMEOUT_MS), 'OCR warm-up');
  } catch {
    worker = null;
  }

  try {
    const Tesseract = await getTesseract();
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
  let fastPrepared = null;

  try {
    if (typeof imageSource === 'string' || Buffer.isBuffer(imageSource)) {
      prepared = await prepareImageForOCR(imageSource, { maxEdge: MAX_OCR_EDGE, quality: 72 });
    }

    if (process.env.GEMINI_API_KEY && prepared.buffer) {
      // First attempt — normal compressed image
      try {
        const result = await performGeminiOCR({
          buffer: prepared.buffer,
          mimeType: prepared.mimeType
        }, GEMINI_OCR_TIMEOUT_MS);
        console.log(`OCR (gemini) completed in ${Date.now() - started}ms`);
        return result;
      } catch (error) {
        const message = isAbortError(error)
          ? `Gemini OCR timed out after ${GEMINI_OCR_TIMEOUT_MS}ms`
          : error.message;
        console.warn('Gemini OCR first attempt failed:', message);
        errors.push(message);

        // Retry once with a smaller/faster image if the first call timed out
        if (isAbortError(error) && (typeof imageSource === 'string' || Buffer.isBuffer(imageSource))) {
          try {
            fastPrepared = await prepareImageForOCR(imageSource, {
              maxEdge: FAST_OCR_EDGE,
              quality: 60
            });
            const result = await performGeminiOCR({
              buffer: fastPrepared.buffer,
              mimeType: fastPrepared.mimeType
            }, GEMINI_OCR_RETRY_TIMEOUT_MS);
            console.log(`OCR (gemini-retry) completed in ${Date.now() - started}ms`);
            return result;
          } catch (retryError) {
            const retryMessage = isAbortError(retryError)
              ? `Gemini OCR retry timed out`
              : retryError.message;
            console.warn('Gemini OCR retry failed:', retryMessage);
            errors.push(retryMessage);
          }
        }
      }
    } else if (!process.env.GEMINI_API_KEY) {
      errors.push('GEMINI_API_KEY is not configured');
    }

    if (!SHOULD_USE_TESSERACT) {
      throw new Error('Gemini Vision OCR is unavailable. Please retry shortly. Local Tesseract OCR is disabled on Vercel because it exceeds serverless execution limits.');
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
    if (fastPrepared?.cleanup) await fastPrepared.cleanup();
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
