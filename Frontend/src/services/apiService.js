import api from './api';

// ==================== AUTH APIs ====================
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
};

// ==================== PRODUCTS APIs ====================
export const productsAPI = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  getBySlug: (slug) => api.get(`/products/slug/${slug}`),
  getRelated: (id) => api.get(`/products/${id}/related`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
  getByCategory: (categoryId) => api.get(`/products/category/${categoryId}`),
};

// ==================== CATEGORIES APIs ====================
export const categoriesAPI = {
  getAll: () => api.get('/categories'),
  getById: (id) => api.get(`/categories/${id}`),
  create: (data) => api.post('/categories', data),
  update: (id, data) => api.put(`/categories/${id}`, data),
  delete: (id) => api.delete(`/categories/${id}`),
};

// ==================== ORDERS APIs ====================
export const ordersAPI = {
  create: (data) => api.post('/orders', data),
  getMyOrders: () => api.get('/orders/myorders'),
  getById: (id) => api.get(`/orders/${id}`),
  getAll: () => api.get('/orders'),
  updateStatus: (id, status, estimatedReadyTime) => 
    api.put(`/orders/${id}/status`, { status, estimatedReadyTime }),
  updatePayment: (id, paymentStatus) => 
    api.put(`/orders/${id}/payment`, { paymentStatus }),
  confirmPayment: (id) => api.post(`/orders/${id}/confirm-payment`),
};

// ==================== PAYMENT APIs ====================
export const paymentAPI = {
  getConfig: () => api.get('/payment/config'),
  createIntent: (amount, orderId) => 
    api.post('/payment/create-intent', { amount, orderId }),
};

// ==================== LOYALTY APIs ====================
export const loyaltyAPI = {
  getTiers: () => api.get('/loyalty/tiers'),
  getMyLoyalty: () => api.get('/loyalty/me'),
  redeemPoints: (points) => api.post('/loyalty/redeem', { points }),
  awardBonus: (action) => api.post('/loyalty/bonus', { action }),
};

// ==================== QR CODE APIs ====================
export const qrAPI = {
  generateTable: (tableNumber, locationId) => 
    api.post('/qr/table', { tableNumber, locationId }),
  getOrderQR: (orderId) => api.get(`/qr/order/${orderId}`),
  generatePayment: (orderId) => api.post('/qr/payment', { orderId }),
};

// ==================== CHATBOT APIs ====================
export const chatbotAPI = {
  chat: (message, conversationId) => 
    api.post('/chatbot/chat', { message, conversationId }),
  getRecommendations: (preferences) => 
    api.post('/chatbot/recommendations', { preferences }),
  processOrder: (orderText) => 
    api.post('/chatbot/process-order', { orderText }),
  faq: (question) => api.post('/chatbot/faq', { question }),
  getGreeting: () => api.get('/chatbot/greeting'),
  clearConversation: (id) => api.delete(`/chatbot/conversation/${id}`),
};

// ==================== VOICE APIs ====================
export const voiceAPI = {
  transcribe: (audioFile, language = 'en') => {
    const formData = new FormData();
    formData.append('audio', audioFile);
    formData.append('language', language);
    return api.post('/voice/transcribe', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  speak: (text, voice = 'alloy') => 
    api.post('/voice/speak', { text, voice }, { responseType: 'blob' }),
  order: (audioFile) => {
    const formData = new FormData();
    formData.append('audio', audioFile);
    return api.post('/voice/order', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  faq: (audioFile) => {
    const formData = new FormData();
    formData.append('audio', audioFile);
    return api.post('/voice/faq', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  chat: (audioFile, conversationId) => {
    const formData = new FormData();
    formData.append('audio', audioFile);
    if (conversationId) formData.append('conversationId', conversationId);
    return api.post('/voice/chat', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  detectLanguage: (audioFile) => {
    const formData = new FormData();
    formData.append('audio', audioFile);
    return api.post('/voice/detect-language', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

// ==================== STORIES APIs ====================
export const storiesAPI = {
  create: (mediaFile, caption, duration, productTags, location, filters) => {
    const formData = new FormData();
    formData.append('media', mediaFile);
    if (caption) formData.append('caption', caption);
    if (duration) formData.append('duration', duration);
    if (productTags) formData.append('productTags', JSON.stringify(productTags));
    if (location) formData.append('location', location);
    if (filters) formData.append('filters', JSON.stringify(filters));
    return api.post('/stories', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  getAll: () => api.get('/stories'),
  getMy: () => api.get('/stories/my'),
  getUserStories: (userId) => api.get(`/stories/user/${userId}`),
  view: (id) => api.post(`/stories/${id}/view`),
  like: (id) => api.post(`/stories/${id}/like`),
  delete: (id) => api.delete(`/stories/${id}`),
  getViewers: (id) => api.get(`/stories/${id}/viewers`),
};

// ==================== CUSTOMIZATION APIs ====================
export const customizationAPI = {
  getOptions: () => api.get('/customize/options'),
  calculatePrice: (basePrice, customizations) => 
    api.post('/customize/calculate-price', { basePrice, customizations }),
  getCommunity: (params) => api.get('/customize/community', { params }),
  create: (data) => api.post('/customize', data),
  getMy: () => api.get('/customize/my'),
  update: (id, data) => api.put(`/customize/${id}`, data),
  delete: (id) => api.delete(`/customize/${id}`),
  clone: (id) => api.post(`/customize/${id}/clone`),
};

// ==================== ANALYTICS APIs ====================
export const analyticsAPI = {
  getDashboard: () => api.get('/analytics/dashboard'),
  getSales: (startDate, endDate) => 
    api.get('/analytics/sales', { params: { startDate, endDate } }),
  getPopularProducts: (limit = 10, period = 30) => 
    api.get('/analytics/popular-products', { params: { limit, period } }),
  getCustomers: () => api.get('/analytics/customers'),
  getOrderStatus: () => api.get('/analytics/order-status'),
  getRevenueByCategory: (startDate, endDate) => 
    api.get('/analytics/revenue-by-category', { params: { startDate, endDate } }),
  getRatings: () => api.get('/analytics/ratings'),
  getLoyalty: () => api.get('/analytics/loyalty'),
};

// ==================== NOTIFICATIONS APIs ====================
export const notificationsAPI = {
  getAll: (limit = 20) => api.get('/notifications', { params: { limit } }),
  markAsRead: (id) => api.put(`/notifications/${id}/read`),
  markAllAsRead: () => api.put('/notifications/read-all'),
  delete: (id) => api.delete(`/notifications/${id}`),
};

// ==================== REVIEWS APIs ====================
export const reviewsAPI = {
  create: (data) => api.post('/reviews', data),
  getByProduct: (productId) => api.get(`/reviews/product/${productId}`),
  update: (id, data) => api.put(`/reviews/${id}`, data),
  delete: (id) => api.delete(`/reviews/${id}`),
};

// ==================== WISHLIST APIs ====================
export const wishlistAPI = {
  getAll: () => api.get('/wishlist'),
  add: (productId) => api.post('/wishlist', { productId }),
  remove: (id) => api.delete(`/wishlist/${id}`),
};

// ==================== COMMUNITY APIs ====================
export const communityAPI = {
  getAll: () => api.get('/community'),
  getById: (id) => api.get(`/community/${id}`),
  create: (data) => api.post('/community', data),
  update: (id, data) => api.put(`/community/${id}`, data),
  delete: (id) => api.delete(`/community/${id}`),
};

// ==================== EVENTS APIs ====================
export const eventsAPI = {
  getAll: () => api.get('/events'),
  getById: (id) => api.get(`/events/${id}`),
  create: (data) => api.post('/events', data),
  update: (id, data) => api.put(`/events/${id}`, data),
  delete: (id) => api.delete(`/events/${id}`),
};

// ==================== ADMIN APIs ====================
export const adminAPI = {
  // Dashboard
  getStats: () => api.get('/admin/stats').then(res => res.data),
  
  // Users Management
  getUsers: (params) => api.get('/admin/users', { params }).then(res => res.data),
  getUserDetails: (userId) => api.get(`/admin/users/${userId}`).then(res => res.data),
  updateUser: (userId, data) => api.put(`/admin/users/${userId}`, data).then(res => res.data),
  deleteUser: (userId) => api.delete(`/admin/users/${userId}`).then(res => res.data),
  
  // Categories Management
  getCategories: () => api.get('/admin/categories').then(res => res.data),
  
  // Reviews Management
  getReviews: (params) => api.get('/admin/reviews', { params }).then(res => res.data),
  deleteReview: (reviewId) => api.delete(`/admin/reviews/${reviewId}`).then(res => res.data),
  
  // Community Posts Management
  getPosts: (params) => api.get('/admin/posts', { params }).then(res => res.data),
  deletePost: (postId) => api.delete(`/admin/posts/${postId}`).then(res => res.data),
  
  // System Health
  getSystemHealth: () => api.get('/admin/system/health').then(res => res.data),
};

// ==================== UPLOAD APIs ====================
export const uploadAPI = {
  uploadSingle: (formData) => 
    api.post('/upload/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  uploadMultiple: (formData) => 
    api.post('/upload/images', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};

// Export all APIs
export default {
  auth: authAPI,
  products: productsAPI,
  categories: categoriesAPI,
  orders: ordersAPI,
  payment: paymentAPI,
  loyalty: loyaltyAPI,
  qr: qrAPI,
  chatbot: chatbotAPI,
  voice: voiceAPI,
  stories: storiesAPI,
  customization: customizationAPI,
  analytics: analyticsAPI,
  notifications: notificationsAPI,
  reviews: reviewsAPI,
  wishlist: wishlistAPI,
  community: communityAPI,
  events: eventsAPI,
  admin: adminAPI,
  upload: uploadAPI,
};
