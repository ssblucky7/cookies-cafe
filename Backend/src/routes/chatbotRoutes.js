import express from 'express';
import {
  chat,
  recommendations,
  processOrder,
  faq,
  greeting,
  clearConversation,
} from '../controllers/chatbotController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/chat', protect, chat);
router.post('/recommendations', protect, recommendations);
router.post('/process-order', protect, processOrder);
router.post('/faq', faq);
router.get('/greeting', protect, greeting);
router.delete('/conversation/:id', protect, clearConversation);

export default router;
