import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import { uploadSingle, uploadMultiple } from '../middleware/upload.js';
import {
  uploadSingleImage,
  uploadMultipleImagesHandler,
  uploadVideoHandler,
  upload3DModelHandler,
  deleteMediaHandler,
} from '../controllers/uploadController.js';

const router = express.Router();

// All upload routes require authentication
router.use(protect);

// Upload single image
router.post('/image', uploadSingle('image'), uploadSingleImage);

// Upload multiple images
router.post('/images', uploadMultiple('images', 5), uploadMultipleImagesHandler);

// Upload video
router.post('/video', uploadSingle('video'), uploadVideoHandler);

// Upload 3D model (admin only)
router.post('/model', admin, uploadSingle('model'), upload3DModelHandler);

// Delete media (admin only)
router.delete('/media', admin, deleteMediaHandler);

export default router;
