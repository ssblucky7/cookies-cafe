import express from 'express';
import {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  registerForEvent,
} from '../controllers/eventController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getEvents)
  .post(protect, admin, createEvent);

router.route('/:id')
  .get(getEvent)
  .put(protect, admin, updateEvent)
  .delete(protect, admin, deleteEvent);

router.post('/:id/register', protect, registerForEvent);

export default router;
