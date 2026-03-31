import express from 'express';
import { getMyLoyalty, redeemLoyaltyPoints, awardBonus, getLoyaltyTiers } from '../controllers/loyaltyController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/tiers', getLoyaltyTiers);
router.get('/me', protect, getMyLoyalty);
router.post('/redeem', protect, redeemLoyaltyPoints);
router.post('/bonus', protect, awardBonus);

export default router;
