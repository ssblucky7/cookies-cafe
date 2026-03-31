import { useState, useRef, useEffect } from 'react';
import { FiUpload, FiX, FiImage } from 'react-icons/fi';
import { uploadAPI } from '../../services/apiService';

const ImageUpload = ({ 
  onUploadSuccess, 
  folder = 'cookies-cafe/misc',
  maxSize = 5, // MB
  preview = true,
  multiple = false,
  existingImages = []
}) => {
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  // Update images when existingImages prop changes
  useEffect(() => {
    if (existingImages && existingImages.length > 0) {
      setImages(existingImages);
    }
  }, [existingImages]);

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    setError('');

    if (files.length === 0) return;

    console.log('Files selected:', files.length);
    console.log('File details:', files.map(f => ({ name: f.name, size: f.size, type: f.type })));

    // Validate file size
    const oversizedFiles = files.filter(file => file.size > maxSize * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      setError(`File size must be less than ${maxSize}MB`);
      return;
    }

    // Validate file type
    const invalidFiles = files.filter(file => !file.type.startsWith('image/'));
    if (invalidFiles.length > 0) {
      setError('Only image files are allowed');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      
      if (multiple) {
        files.forEach(file => formData.append('images', file));
        formData.append('folder', folder);
        
        console.log('Uploading multiple images to:', folder);
        const response = await uploadAPI.uploadMultiple(formData);
        console.log('Multiple upload response:', response.data);
        
        if (response.data.success) {
          const newImages = [...images, ...response.data.data];
          setImages(newImages);
          onUploadSuccess(newImages);
        } else {
          setError(response.data.message || 'Upload failed');
        }
      } else {
        formData.append('image', files[0]);
        formData.append('folder', folder);
        
        console.log('Uploading single image to:', folder);
        const response = await uploadAPI.uploadSingle(formData);
        console.log('Single upload response:', response.data);
        
        if (response.data.success) {
          const uploadedImage = response.data.data;
          console.log('Image uploaded successfully:', uploadedImage);
          console.log('Image URL:', uploadedImage.url);
          
          // Set the image with proper structure
          const imageData = { url: uploadedImage.url, publicId: uploadedImage.publicId };
          setImages([imageData]);
          onUploadSuccess(uploadedImage);
        } else {
          setError(response.data.message || 'Upload failed');
        }
      }
    } catch (err) {
      console.error('Upload error:', err);
      console.error('Error response:', err.response?.data);
      setError(err.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onUploadSuccess(multiple ? newImages : null);
  };

  return (
    <div className="space-y-4">
      {/* Upload Button */}
      <div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="w-full border-2 border-dashed border-brown rounded-lg p-8 hover:border-caramel transition text-center disabled:opacity-50"
        >
          <FiUpload className="mx-auto text-brown mb-2" size={48} />
          <p className="text-brown font-semibold">
            {uploading ? 'Uploading...' : 'Click to upload'}
          </p>
          <p className="text-sm text-brown mt-1">
            {multiple ? 'Multiple images allowed' : 'Single image only'} (Max {maxSize}MB)
          </p>
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Preview */}
      {preview && images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, index) => {
            const imageUrl = typeof img === 'string' ? img : (img.url || img);
            
            return (
              <div key={index} className="relative group">
                <img
                  src={imageUrl}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/150?text=Error';
                  }}
                />
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  <FiX size={16} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
