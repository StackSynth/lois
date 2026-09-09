import app from './app.js';
import { warmOCR } from './ocr/ocrEngine.js';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`\n🤖 JARVIS Backend running on http://localhost:${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/api/health\n`);
  warmOCR()
    .then(() => console.log('🔤 OCR engine warmed and ready'))
    .catch(() => console.warn('⚠️  OCR warm-up skipped — first scan may be slower'));
});
