import { createPaymentIntent, verifyWebhookSignature } from '../services/paymentService.js';
import { Order } from '../models/index.js';

// @desc    Create payment intent
// @route   POST /api/payment/create-intent
// @access  Private
export const createIntent = async (req, res) => {
  try {
    const { amount, orderId } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid amount',
      });
    }

    const paymentIntent = await createPaymentIntent(amount, 'usd', {
      orderId,
      userId: req.user.id,
    });

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.clientSecret,
      paymentIntentId: paymentIntent.paymentIntentId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Handle Stripe webhook
// @route   POST /api/payment/webhook
// @access  Public
export const handleWebhook = async (req, res) => {
  const signature = req.headers['stripe-signature'];

  try {
    const verification = verifyWebhookSignature(req.body, signature);

    if (!verification.success) {
      return res.status(400).json({
        success: false,
        message: 'Webhook signature verification failed',
      });
    }

    const event = verification.event;

    // Handle different event types
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        const orderId = paymentIntent.metadata.orderId;

        if (orderId) {
          const order = await Order.findByPk(orderId);
          if (order) {
            order.paymentStatus = 'paid';
            await order.save();
          }
        }
        break;

      case 'payment_intent.payment_failed':
        const failedIntent = event.data.object;
        const failedOrderId = failedIntent.metadata.orderId;

        if (failedOrderId) {
          const order = await Order.findByPk(failedOrderId);
          if (order) {
            order.paymentStatus = 'failed';
            await order.save();
          }
        }
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get payment config
// @route   GET /api/payment/config
// @access  Public
export const getPaymentConfig = async (req, res) => {
  res.status(200).json({
    success: true,
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
};
