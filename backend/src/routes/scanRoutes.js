/**
 * Scan Routes — REST API endpoints for the compliance checker.
 */
import { Router } from 'express';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { scanImage, ocrOnly, validateFields, getScans, getScanById, runDemo } from '../controllers/scanController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = process.env.VERCEL
      ? '/tmp'
      : join(__dirname, '..', '..', 'uploads');
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = file.originalname.split('.').pop();
    cb(null, `scan-${uniqueSuffix}.${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/bmp', 'image/tiff'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (JPEG, PNG, WebP, BMP, TIFF) are allowed'));
    }
  }
});

const router = Router();

// Full scan pipeline
router.post('/scan', upload.single('image'), scanImage);

// OCR only
router.post('/ocr', upload.single('image'), ocrOnly);

// Validate pre-extracted fields
router.post('/validate', validateFields);

// List all scans
router.get('/scans', getScans);

// Get single scan
router.get('/scans/:id', getScanById);

// Demo endpoints
router.post('/demo/:demoId', runDemo);

export { router as scanRoutes };
