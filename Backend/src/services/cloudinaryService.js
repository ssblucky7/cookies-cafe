import cloudinary from '../config/cloudinary.js';
import { Readable } from 'stream';

/**
 * Upload image to Cloudinary
 */
export const uploadImage = async (fileBuffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: options.folder || 'cookies-cafe/misc',
        transformation: options.transformation || [
          { quality: 'auto', fetch_format: 'auto' }
        ],
        use_filename: true,
        unique_filename: true,
        overwrite: false,
        resource_type: 'image',
        secure: true, // Force HTTPS URLs
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          // Ensure URL has https protocol
          const secureUrl = result.secure_url.startsWith('http') 
            ? result.secure_url 
            : `https:${result.secure_url}`;
          
          resolve({
            url: secureUrl,
            publicId: result.public_id,
            width: result.width,
            height: result.height,
            format: result.format,
          });
        }
      }
    );

    const readableStream = Readable.from(fileBuffer);
    readableStream.pipe(uploadStream);
  });
};

export const uploadVideo = async (fileBuffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: options.folder || 'cookies-cafe/videos',
        resource_type: 'video',
        transformation: options.transformation || [{ quality: 'auto' }],
        use_filename: true,
        unique_filename: true,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
            duration: result.duration,
            format: result.format,
          });
        }
      }
    );

    const readableStream = Readable.from(fileBuffer);
    readableStream.pipe(uploadStream);
  });
};

export const upload3DModel = async (fileBuffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: options.folder || 'cookies-cafe/models',
        resource_type: 'raw',
        use_filename: true,
        unique_filename: true,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
            format: result.format,
          });
        }
      }
    );

    const readableStream = Readable.from(fileBuffer);
    readableStream.pipe(uploadStream);
  });
};

export const deleteMedia = async (publicId, resourceType = 'image') => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
    return result;
  } catch (error) {
    throw new Error(`Failed to delete media: ${error.message}`);
  }
};

export const uploadMultipleImages = async (fileBuffers, options = {}) => {
  const uploadPromises = fileBuffers.map(buffer => uploadImage(buffer, options));
  return Promise.all(uploadPromises);
};

export const getOptimizedImageUrl = (publicId, transformations = {}) => {
  return cloudinary.url(publicId, {
    quality: 'auto',
    fetch_format: 'auto',
    ...transformations,
  });
};

export default {
  uploadImage,
  uploadVideo,
  upload3DModel,
  deleteMedia,
  uploadMultipleImages,
  getOptimizedImageUrl,
};
