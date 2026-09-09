/**
 * API Service — Axios-based client for Jarvis backend.
 */
import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || ''}/api`,
  timeout: 120000, // 2 min for OCR
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.error?.message || error.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

/**
 * Upload and scan a product label image.
 */
export async function scanImage(file) {
  const formData = new FormData();
  formData.append('image', file);

  return api.post('/scan', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
}

/**
 * Run a demo product scan (bypasses OCR).
 */
export async function runDemo(demoId) {
  return api.post(`/demo/${demoId}`);
}

/**
 * Get all scans with optional filters.
 */
export async function getScans(filters = {}) {
  const params = new URLSearchParams();
  if (filters.search) params.set('search', filters.search);
  if (filters.status) params.set('status', filters.status);
  if (filters.isDemo !== undefined) params.set('isDemo', filters.isDemo);

  return api.get(`/scans?${params.toString()}`);
}

/**
 * Get a single scan by ID.
 */
export async function getScan(id) {
  return api.get(`/scans/${id}`);
}

export default api;
