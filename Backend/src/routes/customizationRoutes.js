import express from 'express';
import {
  create,
  getMy,
  getCommunity,
  update,
  remove,
  clone,
  getOptions,
  calculatePrice,
} from '../controllers/customizationController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/options', getOptions);
router.post('/calculate-price', calculatePrice);
router.get('/community', getCommunity);
router.post('/', protect, create);
router.get('/my', protect, getMy);
router.put('/:id', protect, update);
router.delete('/:id', protect, remove);
router.post('/:id/clone', protect, clone);

export default router;
