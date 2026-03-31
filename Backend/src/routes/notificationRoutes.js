import express from 'express';
import {
  getNotifications,
  markRead,
  markAllRead,
  remove,
} from '../controllers/notificationController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getNotifications);
router.put('/:id/read', protect, markRead);
router.put('/read-all', protect, markAllRead);
router.delete('/:id', protect, remove);

export default router;
