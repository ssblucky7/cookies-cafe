import express from 'express';
import {
  sales,
  popularProducts,
  customers,
  orderStatus,
  revenueByCategory,
  ratings,
  loyalty,
  dashboard,
} from '../controllers/analyticsController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// All analytics routes require admin access
router.use(protect, admin);

router.get('/dashboard', dashboard);
router.get('/sales', sales);
router.get('/popular-products', popularProducts);
router.get('/customers', customers);
router.get('/order-status', orderStatus);
router.get('/revenue-by-category', revenueByCategory);
router.get('/ratings', ratings);
router.get('/loyalty', loyalty);

export default router;
