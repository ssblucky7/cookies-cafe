import express from 'express';
import { createIntent, handleWebhook, getPaymentConfig } from '../controllers/paymentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/config', getPaymentConfig);
router.post('/create-intent', protect, createIntent);
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

export default router;
