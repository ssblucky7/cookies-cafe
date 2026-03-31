import OpenAI from 'openai';
import { Product, Category, Order } from '../models/index.js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generate chatbot response
 */
export const generateChatResponse = async (message, context = {}) => {
  try {
    const systemPrompt = `You are a friendly AI assistant for Cookies Cafe, a bakery and cafe. 
    You help customers with:
    - Menu recommendations
    - Order placement
    - Product information
    - Store hours and location
    - Loyalty program details
    
    Be warm, helpful, and concise. If asked to place an order, guide them through the process.
    Current context: ${JSON.stringify(context)}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return {
      success: true,
      response: completion.choices[0].message.content,
      usage: completion.usage,
    };
  } catch (error) {
    throw new Error(`Chatbot error: ${error.message}`);
  }
};

/**
 * Get product recommendations based on user preferences
 */
export const getRecommendations = async (userPreferences, orderHistory = []) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category, as: 'category' }],
      limit: 20,
    });

    const prompt = `Based on these products: ${JSON.stringify(products.map(p => ({
      name: p.name,
      description: p.description,
      category: p.category?.name,
      price: p.price,
    })))}
    
    And user preferences: ${userPreferences}
    And order history: ${JSON.stringify(orderHistory)}
    
    Recommend 3-5 products that would best match. Return as JSON array with product names and reasons.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
      response_format: { type: 'json_object' },
    });

    return {
      success: true,
      recommendations: JSON.parse(completion.choices[0].message.content),
    };
  } catch (error) {
    throw new Error(`Recommendation error: ${error.message}`);
  }
};

/**
 * Process natural language order
 */
export const processNaturalLanguageOrder = async (orderText, userId) => {
  try {
    const products = await Product.findAll({
      attributes: ['id', 'name', 'price', 'description'],
    });

    const prompt = `Extract order details from this text: "${orderText}"
    
    Available products: ${JSON.stringify(products)}
    
    Return JSON with:
    {
      "items": [{"productId": "uuid", "productName": "name", "quantity": number}],
      "specialInstructions": "any special requests",
      "confidence": number (0-1)
    }`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    });

    const orderData = JSON.parse(completion.choices[0].message.content);

    return {
      success: true,
      orderData,
    };
  } catch (error) {
    throw new Error(`Order processing error: ${error.message}`);
  }
};

/**
 * Answer FAQ questions
 */
export const answerFAQ = async (question) => {
  const faqContext = `
  Store Hours: Monday-Sunday, 8 AM - 10 PM
  Location: Samakhusi, Ranibari Marg, Kathmandu, Nepal
  Delivery: Available within 5km radius
  Payment: Cash, Card, Stripe, QR Code
  Loyalty Program: Earn 10 points per $1 spent
  Tiers: Bronze (0+), Silver (2000+), Gold (5000+), Platinum (10000+)
  Contact: info@cookiescafe.com, +977-1-234567
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a helpful assistant for Cookies Cafe. Use this information to answer questions: ${faqContext}`,
        },
        { role: 'user', content: question },
      ],
      temperature: 0.5,
      max_tokens: 300,
    });

    return {
      success: true,
      answer: completion.choices[0].message.content,
    };
  } catch (error) {
    throw new Error(`FAQ error: ${error.message}`);
  }
};

/**
 * Generate personalized greeting
 */
export const generateGreeting = async (userName, timeOfDay, loyaltyTier) => {
  try {
    const prompt = `Generate a warm, personalized greeting for ${userName}, a ${loyaltyTier} tier member, during ${timeOfDay}. Keep it brief and friendly.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.9,
      max_tokens: 100,
    });

    return {
      success: true,
      greeting: completion.choices[0].message.content,
    };
  } catch (error) {
    throw new Error(`Greeting error: ${error.message}`);
  }
};

export default {
  generateChatResponse,
  getRecommendations,
  processNaturalLanguageOrder,
  answerFAQ,
  generateGreeting,
};
