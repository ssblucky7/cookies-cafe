import {
  generateChatResponse,
  getRecommendations,
  processNaturalLanguageOrder,
  answerFAQ,
  generateGreeting,
} from '../services/chatbotService.js';
import { User, Order } from '../models/index.js';

// In-memory conversation storage
const conversationStore = new Map();
const MAX_HISTORY_PER_CONVERSATION = 10;

// @desc    Chat with AI assistant
// @route   POST /api/chatbot/chat
// @access  Private
export const chat = async (req, res) => {
  try {
    const { message, conversationId } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Message is required',
      });
    }

    // Get conversation history from memory
    const historyKey = conversationId || req.user.id;
    const history = conversationStore.get(historyKey) || [];

    // Get user context
    const user = await User.findByPk(req.user.id);
    const context = {
      userName: user.name,
      loyaltyPoints: user.loyaltyPoints,
      conversationHistory: history,
    };

    const response = await generateChatResponse(message, context);

    // Store conversation in memory
    const updatedHistory = [
      {
        role: 'user',
        content: message,
        timestamp: Date.now(),
      },
      {
        role: 'assistant',
        content: response.response,
        timestamp: Date.now(),
      },
      ...history,
    ].slice(0, MAX_HISTORY_PER_CONVERSATION);
    
    conversationStore.set(historyKey, updatedHistory);

    res.status(200).json({
      success: true,
      data: {
        response: response.response,
        conversationId: conversationId || req.user.id,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get product recommendations
// @route   POST /api/chatbot/recommendations
// @access  Private
export const recommendations = async (req, res) => {
  try {
    const { preferences } = req.body;

    // Get user's order history
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      limit: 5,
      order: [['createdAt', 'DESC']],
    });

    const orderHistory = orders.map(o => o.items).flat();

    const result = await getRecommendations(preferences, orderHistory);

    res.status(200).json({
      success: true,
      data: result.recommendations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Process natural language order
// @route   POST /api/chatbot/process-order
// @access  Private
export const processOrder = async (req, res) => {
  try {
    const { orderText } = req.body;

    if (!orderText) {
      return res.status(400).json({
        success: false,
        message: 'Order text is required',
      });
    }

    const result = await processNaturalLanguageOrder(orderText, req.user.id);

    res.status(200).json({
      success: true,
      data: result.orderData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Answer FAQ
// @route   POST /api/chatbot/faq
// @access  Public
export const faq = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: 'Question is required',
      });
    }

    const result = await answerFAQ(question);

    res.status(200).json({
      success: true,
      data: {
        answer: result.answer,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get personalized greeting
// @route   GET /api/chatbot/greeting
// @access  Private
export const greeting = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    
    const hour = new Date().getHours();
    const timeOfDay = hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening';
    
    const loyaltyTier = user.loyaltyPoints >= 10000 ? 'Platinum' :
                        user.loyaltyPoints >= 5000 ? 'Gold' :
                        user.loyaltyPoints >= 2000 ? 'Silver' : 'Bronze';

    const result = await generateGreeting(user.name, timeOfDay, loyaltyTier);

    res.status(200).json({
      success: true,
      data: {
        greeting: result.greeting,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Clear conversation history
// @route   DELETE /api/chatbot/conversation/:id
// @access  Private
export const clearConversation = async (req, res) => {
  try {
    const conversationId = req.params.id;
    conversationStore.delete(conversationId);

    res.status(200).json({
      success: true,
      message: 'Conversation cleared',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
