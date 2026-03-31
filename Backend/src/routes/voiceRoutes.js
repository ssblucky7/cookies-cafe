import express from 'express';
import {
  transcribe,
  speak,
  voiceOrder,
  voiceFAQHandler,
  voiceChatHandler,
  detectLang,
} from '../controllers/voiceController.js';
import { protect } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Audio upload middleware for voice files
const audioUpload = upload.single('audio');

router.post('/transcribe', protect, audioUpload, transcribe);
router.post('/speak', speak);
router.post('/order', protect, audioUpload, voiceOrder);
router.post('/faq', audioUpload, voiceFAQHandler);
router.post('/chat', protect, audioUpload, voiceChatHandler);
router.post('/detect-language', audioUpload, detectLang);

export default router;
