import { uploadImage, uploadVideo, upload3DModel, deleteMedia, uploadMultipleImages } from '../services/cloudinaryService.js';

// Upload single image
export const uploadSingleImage = async (req, res) => {
  try {
    console.log('=== UPLOAD REQUEST ===');
    console.log('File:', req.file ? 'Present' : 'Missing');
    console.log('Body:', req.body);
    console.log('Cloudinary Config:', {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY ? 'Set' : 'Missing',
      api_secret: process.env.CLOUDINARY_API_SECRET ? 'Set' : 'Missing'
    });
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    const folder = req.body.folder || 'cookies-cafe/misc';
    console.log('Uploading to folder:', folder);
    console.log('File size:', req.file.size, 'bytes');
    console.log('File mimetype:', req.file.mimetype);
    
    const result = await uploadImage(req.file.buffer, { folder });
    console.log('Upload successful:', result);
    console.log('=== UPLOAD COMPLETE ===');

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('=== UPLOAD ERROR ===');
    console.error('Error:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Upload multiple images
export const uploadMultipleImagesHandler = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded',
      });
    }

    const folder = req.body.folder || 'cookies-cafe/gallery';
    const fileBuffers = req.files.map(file => file.buffer);
    const results = await uploadMultipleImages(fileBuffers, { folder });

    res.status(200).json({
      success: true,
      data: results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Upload video
export const uploadVideoHandler = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    const folder = req.body.folder || 'cookies-cafe/videos';
    const result = await uploadVideo(req.file.buffer, { folder });

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Upload 3D model
export const upload3DModelHandler = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    const folder = req.body.folder || 'cookies-cafe/models';
    const result = await upload3DModel(req.file.buffer, { folder });

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete media
export const deleteMediaHandler = async (req, res) => {
  try {
    const { publicId, resourceType } = req.body;

    if (!publicId) {
      return res.status(400).json({
        success: false,
        message: 'Public ID is required',
      });
    }

    const result = await deleteMedia(publicId, resourceType || 'image');

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
