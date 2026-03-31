import express from 'express';
import {
  create,
  getAll,
  getMy,
  getUserStoriesById,
  view,
  like,
  remove,
  getViewers,
} from '../controllers/storyController.js';
import { protect } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/', protect, upload.single('media'), create);
router.get('/', protect, getAll);
router.get('/my', protect, getMy);
router.get('/user/:userId', protect, getUserStoriesById);
router.post('/:id/view', protect, view);
router.post('/:id/like', protect, like);
router.delete('/:id', protect, remove);
router.get('/:id/viewers', protect, getViewers);

export default router;
