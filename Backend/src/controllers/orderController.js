import { Order, Product, User } from '../models/index.js';
import sequelize from '../config/database.js';
import { sendOrderConfirmation, sendOrderStatusUpdate } from '../services/emailService.js';
import { createPaymentIntent, confirmPayment } from '../services/paymentService.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const {
      items,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      tableNumber,
      orderType,
      loyaltyPointsToUse,
    } = req.body;

    if (!items || items.length === 0) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: 'No order items',
      });
    }

    // Verify stock availability
    for (const item of items) {
      const productId = item.product || item.productId;
      const product = await Product.findByPk(productId);
      if (!product || product.stock < item.quantity) {
        await transaction.rollback();
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product?.name || 'product'}`,
        });
      }
    }

    let finalTotal = totalPrice;
    let pointsUsed = 0;

    // Create order
    const order = await Order.create({
      userId: req.user.id,
      items,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice: finalTotal,
      tableNumber,
      orderType: orderType || 'delivery',
      loyaltyPointsUsed: pointsUsed,
      estimatedReadyTime: new Date(Date.now() + 30 * 60000), // 30 minutes
    }, { transaction });

    // Handle Stripe payment
    if (paymentMethod === 'stripe') {
      const paymentIntent = await createPaymentIntent(
        finalTotal,
        'usd',
        {
          orderId: order.id,
          orderNumber: order.orderNumber,
          userId: req.user.id,
        }
      );

      order.stripePaymentIntentId = paymentIntent.paymentIntentId;
      await order.save({ transaction });

      await transaction.commit();

      return res.status(201).json({
        success: true,
        data: order,
        clientSecret: paymentIntent.clientSecret,
      });
    }

    // Update product stock
    for (const item of items) {
      const productId = item.product || item.productId;
      await Product.decrement('stock', {
        by: item.quantity,
        where: { id: productId },
        transaction
      });
    }

    await transaction.commit();

    // Send order confirmation email
    const user = await User.findByPk(req.user.id);
    sendOrderConfirmation(order, user);

    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email']
      }],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email', 'phone']
      }]
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    // Check if user owns this order or is admin
    if (order.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this order',
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
  try {
    const { status, estimatedReadyTime } = req.body;

    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    order.status = status;

    if (estimatedReadyTime) {
      order.estimatedReadyTime = new Date(estimatedReadyTime);
    }

    if (status === 'delivered') {
      order.deliveredAt = new Date();
    }

    await order.save();

    // Send status update email
    const user = await User.findByPk(order.userId);
    sendOrderStatusUpdate(order, user, status);

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update payment status
// @route   PUT /api/orders/:id/payment
// @access  Private/Admin
export const updatePaymentStatus = async (req, res) => {
  try {
    const { paymentStatus } = req.body;

    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    order.paymentStatus = paymentStatus;
    await order.save();

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Confirm Stripe payment
// @route   POST /api/orders/:id/confirm-payment
// @access  Private
export const confirmStripePayment = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    if (order.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized',
      });
    }

    if (!order.stripePaymentIntentId) {
      return res.status(400).json({
        success: false,
        message: 'No payment intent found',
      });
    }

    const payment = await confirmPayment(order.stripePaymentIntentId);

    if (payment.success) {
      order.paymentStatus = 'paid';
      await order.save();
    }

    res.status(200).json({
      success: payment.success,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
