import express from 'express';
import {
  getDashboardStats,
  getAllUsers,
  getUserDetails,
  updateUser,
  deleteUser,
  getAllCategories,
  getAllReviews,
  deleteReview,
  getAllPosts,
  deletePost,
  getSystemHealth
} from '../controllers/adminController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// All routes require admin access
router.use(protect, admin);

// Dashboard
router.get('/stats', getDashboardStats);

// Users management
router.get('/users', getAllUsers);
router.get('/users/:id', getUserDetails);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Categories management
router.get('/categories', getAllCategories);

// Reviews management
router.get('/reviews', getAllReviews);
router.delete('/reviews/:id', deleteReview);

// Community posts management
router.get('/posts', getAllPosts);
router.delete('/posts/:id', deletePost);

// System health
router.get('/system/health', getSystemHealth);

export default router;
