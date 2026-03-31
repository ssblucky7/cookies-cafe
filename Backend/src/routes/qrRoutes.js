import express from 'express';
import { generateTableQRCode, generateOrderQRCode, generatePaymentQRCode } from '../controllers/qrController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.post('/table', protect, admin, generateTableQRCode);
router.get('/order/:id', protect, generateOrderQRCode);
router.post('/payment', protect, generatePaymentQRCode);

export default router;
