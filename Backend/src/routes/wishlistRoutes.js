import express from 'express';
import { getWishlist, addToWishlist, removeFromWishlist, checkWishlist } from '../controllers/wishlistController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getWishlist);
router.post('/:productId', protect, addToWishlist);
router.delete('/:productId', protect, removeFromWishlist);
router.get('/check/:productId', protect, checkWishlist);

export default router;
