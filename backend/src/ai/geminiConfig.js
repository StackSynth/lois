/**
 * Shared Gemini model resolution.
 * Retired model values are remapped to the stable OCR default so existing
 * deployments continue to work after a model shutdown.
 */
const DEFAULT_MODEL = 'gemini-3.6-flash';

const RETIRED_MODEL_PATTERNS = [
  /^gemini-2\.0-/i,
  /^gemini-1\.5-/i,
  /^gemini-pro$/i,
  /^gemini-flash$/i
];

export function resolveGeminiModel(configured = process.env.GEMINI_MODEL) {
  const requested = (configured || DEFAULT_MODEL).trim();
  const retired = RETIRED_MODEL_PATTERNS.some((pattern) => pattern.test(requested));
  const model = retired ? DEFAULT_MODEL : requested;

  if (model !== requested) {
    console.warn(`Ignoring retired GEMINI_MODEL=${requested}; using ${model}.`);
  }

  return model;
}

export const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';

export function geminiGenerateUrl(model = resolveGeminiModel(), apiKey = process.env.GEMINI_API_KEY) {
  return `${GEMINI_API_BASE}/${model}:generateContent?key=${encodeURIComponent(apiKey || '')}`;
}

export function getGeminiRateLimitHeaders(response) {
  const headers = {};
  for (const [name, value] of response.headers.entries()) {
    if (/rate|quota|retry-after|reset/i.test(name)) headers[name] = value;
  }
  return headers;
}
