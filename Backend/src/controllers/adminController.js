import { User, Product, Order, CommunityPost, Category, Review, Event, Wishlist, Story } from '../models/index.js';
import { Op } from 'sequelize';
import sequelize from '../config/database.js';

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getDashboardStats = async (req, res) => {
  try {
    // Total counts
    const totalUsers = await User.count({ where: { role: 'user' } });
    const totalAdmins = await User.count({ where: { role: 'admin' } });
    const totalProducts = await Product.count();
    const totalOrders = await Order.count();
    const totalPosts = await CommunityPost.count();
    const totalReviews = await Review.count();
    const totalCategories = await Category.count();
    const totalEvents = await Event.count();

    // Revenue calculation
    const paidOrders = await Order.findAll({ where: { paymentStatus: 'paid' } });
    const totalRevenue = paidOrders.reduce((sum, order) => sum + parseFloat(order.totalPrice), 0);
    const pendingOrders = await Order.count({ where: { paymentStatus: 'pending' } });
    const pendingRevenue = (await Order.findAll({ where: { paymentStatus: 'pending' } }))
      .reduce((sum, order) => sum + parseFloat(order.totalPrice), 0);

    // Recent orders
    const recentOrders = await Order.findAll({
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email']
      }],
      order: [['createdAt', 'DESC']],
      limit: 10
    });

    // Order status breakdown
    const ordersByStatus = await Order.findAll({
      attributes: [
        'status',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      group: ['status'],
      raw: true
    });

    // Payment status breakdown
    const ordersByPayment = await Order.findAll({
      attributes: [
        'paymentStatus',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
        [sequelize.fn('SUM', sequelize.col('totalPrice')), 'total']
      ],
      group: ['paymentStatus'],
      raw: true
    });

    // Top selling products
    const allOrders = await Order.findAll({
      attributes: ['items'],
      where: { paymentStatus: 'paid' }
    });

    const productSales = {};
    allOrders.forEach(order => {
      order.items.forEach(item => {
        if (!productSales[item.product]) {
          productSales[item.product] = {
            productId: item.product,
            totalSold: 0,
            revenue: 0,
            name: item.name,
            image: item.image
          };
        }
        productSales[item.product].totalSold += item.quantity;
        productSales[item.product].revenue += item.quantity * parseFloat(item.price);
      });
    });

    const topProducts = Object.values(productSales)
      .sort((a, b) => b.totalSold - a.totalSold)
      .slice(0, 10);

    // Low stock products
    const lowStockProducts = await Product.findAll({
      where: {
        stock: { [Op.lte]: 10 },
        stock: { [Op.gt]: 0 }
      },
      order: [['stock', 'ASC']],
      limit: 10
    });

    // Out of stock products
    const outOfStockProducts = await Product.count({ where: { stock: 0 } });

    // Recent users
    const recentUsers = await User.findAll({
      where: { role: 'user' },
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']],
      limit: 10
    });

    // Monthly revenue (last 12 months)
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

    const monthlyOrders = await Order.findAll({
      where: {
        createdAt: { [Op.gte]: twelveMonthsAgo },
        paymentStatus: 'paid'
      },
      attributes: [
        [sequelize.fn('DATE_TRUNC', 'month', sequelize.col('createdAt')), 'month'],
        [sequelize.fn('SUM', sequelize.col('totalPrice')), 'revenue'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'orders']
      ],
      group: [sequelize.fn('DATE_TRUNC', 'month', sequelize.col('createdAt'))],
      order: [[sequelize.fn('DATE_TRUNC', 'month', sequelize.col('createdAt')), 'ASC']],
      raw: true
    });

    // Daily orders (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const dailyOrders = await Order.findAll({
      where: {
        createdAt: { [Op.gte]: thirtyDaysAgo }
      },
      attributes: [
        [sequelize.fn('DATE', sequelize.col('createdAt')), 'date'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'orders'],
        [sequelize.fn('SUM', sequelize.col('totalPrice')), 'revenue']
      ],
      group: [sequelize.fn('DATE', sequelize.col('createdAt'))],
      order: [[sequelize.fn('DATE', sequelize.col('createdAt')), 'ASC']],
      raw: true
    });

    // Category performance
    const categoryStats = await Category.findAll({
      include: [{
        model: Product,
        as: 'products',
        attributes: []
      }],
      attributes: [
        'id',
        'name',
        [sequelize.fn('COUNT', sequelize.col('products.id')), 'productCount']
      ],
      group: ['Category.id', 'Category.name'],
      raw: true
    });

    // Average order value
    const avgOrderValue = totalRevenue / (paidOrders.length || 1);

    // Customer lifetime value (top 10)
    const customerLTV = await Order.findAll({
      where: { paymentStatus: 'paid' },
      attributes: [
        'userId',
        [sequelize.fn('SUM', sequelize.col('Order.totalPrice')), 'totalSpent'],
        [sequelize.fn('COUNT', sequelize.col('Order.id')), 'orderCount']
      ],
      group: ['userId', 'user.id', 'user.name', 'user.email'],
      order: [[sequelize.fn('SUM', sequelize.col('Order.totalPrice')), 'DESC']],
      limit: 10,
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email']
      }]
    });

    const stats = {
      overview: {
        totalUsers,
        totalAdmins,
        totalProducts,
        totalOrders,
        totalPosts,
        totalReviews,
        totalCategories,
        totalEvents,
        totalRevenue: parseFloat(totalRevenue.toFixed(2)),
        pendingOrders,
        pendingRevenue: parseFloat(pendingRevenue.toFixed(2)),
        avgOrderValue: parseFloat(avgOrderValue.toFixed(2)),
        outOfStockProducts
      },
      recentOrders,
      recentUsers,
      ordersByStatus,
      ordersByPayment,
      topProducts,
      lowStockProducts,
      monthlyRevenue: monthlyOrders,
      dailyOrders,
      categoryStats,
      customerLTV
    };

    // Cache for 5 minutes
    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all users with filters
// @route   GET /api/admin/users
// @access  Private/Admin
export const getAllUsers = async (req, res) => {
  try {
    const { role, search, page = 1, limit = 20, sortBy = 'createdAt', order = 'DESC' } = req.query;

    const where = {};
    if (role) where.role = role;
    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const offset = (page - 1) * limit;

    const { count, rows: users } = await User.findAndCountAll({
      where,
      attributes: { exclude: ['password'] },
      order: [[sortBy, order]],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.status(200).json({
      success: true,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single user details
// @route   GET /api/admin/users/:id
// @access  Private/Admin
export const getUserDetails = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Order,
          as: 'orders',
          limit: 10,
          order: [['createdAt', 'DESC']]
        },
        {
          model: Review,
          as: 'reviews',
          limit: 10,
          order: [['createdAt', 'DESC']]
        }
      ]
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Get user statistics
    const totalOrders = await Order.count({ where: { userId: user.id } });
    const totalSpent = (await Order.findAll({ 
      where: { userId: user.id, paymentStatus: 'paid' } 
    })).reduce((sum, order) => sum + parseFloat(order.totalPrice), 0);

    res.status(200).json({
      success: true,
      data: {
        ...user.toJSON(),
        stats: {
          totalOrders,
          totalSpent: parseFloat(totalSpent.toFixed(2))
        }
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update user
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Prevent updating password through this endpoint
    const { password, ...updateData } = req.body;

    await user.update(updateData);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Prevent deleting admin users
    if (user.role === 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Cannot delete admin users',
      });
    }

    await user.destroy();

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all categories with product count
// @route   GET /api/admin/categories
// @access  Private/Admin
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{
        model: Product,
        as: 'products',
        attributes: []
      }],
      attributes: [
        'id',
        'name',
        'description',
        'image',
        'createdAt',
        'updatedAt',
        [sequelize.fn('COUNT', sequelize.col('products.id')), 'productCount']
      ],
      group: ['Category.id'],
      order: [['name', 'ASC']]
    });

    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all reviews with filters
// @route   GET /api/admin/reviews
// @access  Private/Admin
export const getAllReviews = async (req, res) => {
  try {
    const { rating, page = 1, limit = 20 } = req.query;

    const where = {};
    if (rating) where.rating = parseInt(rating);

    const offset = (page - 1) * limit;

    const { count, rows: reviews } = await Review.findAndCountAll({
      where,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email']
        },
        {
          model: Product,
          as: 'product',
          attributes: ['id', 'name', 'image']
        }
      ],
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.status(200).json({
      success: true,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete review
// @route   DELETE /api/admin/reviews/:id
// @access  Private/Admin
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    await review.destroy();

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all community posts
// @route   GET /api/admin/posts
// @access  Private/Admin
export const getAllPosts = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows: posts } = await CommunityPost.findAndCountAll({
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email']
      }],
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.status(200).json({
      success: true,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete community post
// @route   DELETE /api/admin/posts/:id
// @access  Private/Admin
export const deletePost = async (req, res) => {
  try {
    const post = await CommunityPost.findByPk(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    await post.destroy();

    res.status(200).json({
      success: true,
      message: 'Post deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get system health
// @route   GET /api/admin/system/health
// @access  Private/Admin
export const getSystemHealth = async (req, res) => {
  try {
    // Database health
    const dbStart = Date.now();
    await sequelize.authenticate();
    const dbLatency = Date.now() - dbStart;

    // Memory usage
    const memUsage = process.memoryUsage();

    res.status(200).json({
      success: true,
      data: {
        status: 'healthy',
        uptime: process.uptime(),
        database: {
          status: 'connected',
          latency: `${dbLatency}ms`
        },
        memory: {
          rss: `${(memUsage.rss / 1024 / 1024).toFixed(2)} MB`,
          heapUsed: `${(memUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`,
          heapTotal: `${(memUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`
        },
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
