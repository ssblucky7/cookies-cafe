import { Wishlist, Product, Category } from '../models/index.js';

// @desc    Get user wishlist
// @route   GET /api/wishlist
// @access  Private
export const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findAll({
      where: { userId: req.user.id },
      include: [{
        model: Product,
        as: 'product',
        include: [{
          model: Category,
          as: 'category',
          attributes: ['id', 'name', 'slug']
        }]
      }],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      count: wishlist.length,
      data: wishlist
    });
  } catch (error) {
    console.error('Get wishlist error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Add to wishlist
// @route   POST /api/wishlist/:productId
// @access  Private
export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const existing = await Wishlist.findOne({
      where: { userId: req.user.id, productId }
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Product already in wishlist'
      });
    }

    const wishlistItem = await Wishlist.create({
      userId: req.user.id,
      productId
    });

    res.status(201).json({
      success: true,
      data: wishlistItem,
      message: 'Added to wishlist'
    });
  } catch (error) {
    console.error('Add to wishlist error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Remove from wishlist
// @route   DELETE /api/wishlist/:productId
// @access  Private
export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const wishlistItem = await Wishlist.findOne({
      where: { userId: req.user.id, productId }
    });

    if (!wishlistItem) {
      return res.status(404).json({
        success: false,
        message: 'Item not in wishlist'
      });
    }

    await wishlistItem.destroy();

    res.status(200).json({
      success: true,
      message: 'Removed from wishlist'
    });
  } catch (error) {
    console.error('Remove from wishlist error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Check if product in wishlist
// @route   GET /api/wishlist/check/:productId
// @access  Private
export const checkWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const exists = await Wishlist.findOne({
      where: { userId: req.user.id, productId }
    });

    res.status(200).json({
      success: true,
      inWishlist: !!exists
    });
  } catch (error) {
    console.error('Check wishlist error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
