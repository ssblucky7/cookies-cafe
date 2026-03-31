import User from './User.js';
import Category from './Category.js';
import Product from './Product.js';
import Order from './Order.js';
import CommunityPost from './CommunityPost.js';
import Event from './Event.js';
import Review from './Review.js';
import Wishlist from './Wishlist.js';
import Story from './Story.js';
import StoryView from './StoryView.js';
import CustomProduct from './CustomProduct.js';

// Product - Category relationship
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });

// Order - User relationship
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });

// Review - Product relationship
Review.belongsTo(Product, { foreignKey: 'productId', as: 'product' });
Product.hasMany(Review, { foreignKey: 'productId', as: 'reviews' });

// Review - User relationship
Review.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Review, { foreignKey: 'userId', as: 'reviews' });

// CommunityPost - User relationship
CommunityPost.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(CommunityPost, { foreignKey: 'userId', as: 'posts' });

// Wishlist relationships
Wishlist.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Wishlist.belongsTo(Product, { foreignKey: 'productId', as: 'product' });
User.hasMany(Wishlist, { foreignKey: 'userId', as: 'wishlist' });
Product.hasMany(Wishlist, { foreignKey: 'productId', as: 'wishlists' });

// Story - User relationship
Story.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Story, { foreignKey: 'userId', as: 'stories' });

// StoryView relationships
StoryView.belongsTo(Story, { foreignKey: 'storyId', as: 'story' });
StoryView.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Story.hasMany(StoryView, { foreignKey: 'storyId', as: 'storyViews' });
User.hasMany(StoryView, { foreignKey: 'userId', as: 'userStoryViews' });

// CustomProduct relationships
CustomProduct.belongsTo(User, { foreignKey: 'userId', as: 'user' });
CustomProduct.belongsTo(Product, { foreignKey: 'baseProductId', as: 'baseProduct' });
User.hasMany(CustomProduct, { foreignKey: 'userId', as: 'customProducts' });
Product.hasMany(CustomProduct, { foreignKey: 'baseProductId', as: 'customizations' });

export {
  User,
  Category,
  Product,
  Order,
  CommunityPost,
  Event,
  Review,
  Wishlist,
  Story,
  StoryView,
  CustomProduct
};
