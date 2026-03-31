/**
 * Decode HTML entities and sanitize image URL
 */
export const decodeImageUrl = (url) => {
  if (!url || typeof url !== 'string') {
    return 'https://via.placeholder.com/150?text=No+Image';
  }

  let decodedUrl = url;

  // Use textarea to decode all HTML entities properly
  const textarea = document.createElement('textarea');
  textarea.innerHTML = decodedUrl;
  decodedUrl = textarea.value;

  // Fix protocol-relative URLs
  if (decodedUrl.startsWith('//')) {
    decodedUrl = `https:${decodedUrl}`;
  }

  // Validate URL format
  if (!decodedUrl.startsWith('http://') && !decodedUrl.startsWith('https://')) {
    console.error('Invalid URL format:', decodedUrl);
    return 'https://via.placeholder.com/150?text=Invalid+URL';
  }

  return decodedUrl;
};

/**
 * Sanitize product data with decoded image URLs
 */
export const sanitizeProduct = (product) => {
  if (!product) return product;

  return {
    ...product,
    image: decodeImageUrl(product.image),
    gallery: Array.isArray(product.gallery) 
      ? product.gallery.map(decodeImageUrl) 
      : []
  };
};

/**
 * Sanitize array of products
 */
export const sanitizeProducts = (products) => {
  if (!Array.isArray(products)) return [];
  return products.map(sanitizeProduct);
};
