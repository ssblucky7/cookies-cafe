import express from 'express';
import {
  createOrder,
  getMyOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  updatePaymentStatus,
  confirmStripePayment,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .post(protect, createOrder)
  .get(protect, admin, getAllOrders);

router.get('/myorders', protect, getMyOrders);

router.get('/:id', protect, getOrderById);

router.put('/:id/status', protect, admin, updateOrderStatus);

router.put('/:id/payment', protect, admin, updatePaymentStatus);

router.post('/:id/confirm-payment', protect, confirmStripePayment);

export default router;
