import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

export const sendWelcomeEmail = async (user) => {
  try {
    if (!process.env.EMAIL_USER) return;

    await transporter.sendMail({
      from: `"Cookies Café" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: 'Welcome to Cookies Café! 🍪',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #8B4513;">Welcome to Cookies Café!</h1>
          <p>Hi ${user.name},</p>
          <p>Thank you for joining Cookies Café! We're excited to have you as part of our community.</p>
          <p>Explore our delicious menu and enjoy exclusive offers.</p>
          <a href="${process.env.FRONTEND_URL}/menu" style="display: inline-block; background: #8B4513; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 20px 0;">Browse Menu</a>
          <p>Happy baking!</p>
          <p><strong>The Cookies Café Team</strong></p>
        </div>
      `
    });
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};

export const sendOrderConfirmation = async (order, user) => {
  try {
    if (!process.env.EMAIL_USER) return;

    const itemsList = order.items.map(item => 
      `<li>${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</li>`
    ).join('');

    await transporter.sendMail({
      from: `"Cookies Café" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: `Order Confirmation - #${order.id.slice(0, 8)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #8B4513;">Order Confirmed! 🎉</h1>
          <p>Hi ${user.name},</p>
          <p>Thank you for your order! We've received it and will start preparing your delicious treats.</p>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="margin-top: 0;">Order Details</h2>
            <p><strong>Order ID:</strong> #${order.id.slice(0, 8)}</p>
            <p><strong>Status:</strong> ${order.status}</p>
            <p><strong>Total:</strong> $${order.totalAmount}</p>
            
            <h3>Items:</h3>
            <ul>${itemsList}</ul>
            
            <h3>Delivery Address:</h3>
            <p>${order.shippingAddress.address}<br>
            ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}<br>
            ${order.shippingAddress.country}</p>
          </div>
          
          <a href="${process.env.FRONTEND_URL}/order-tracking/${order.id}" style="display: inline-block; background: #8B4513; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">Track Order</a>
          
          <p style="margin-top: 30px;">Questions? Contact us at support@cookiescafe.com</p>
          <p><strong>The Cookies Café Team</strong></p>
        </div>
      `
    });
  } catch (error) {
    console.error('Error sending order confirmation:', error);
  }
};

export const sendOrderStatusUpdate = async (order, user, newStatus) => {
  try {
    if (!process.env.EMAIL_USER) return;

    const statusMessages = {
      processing: 'Your order is being prepared',
      shipped: 'Your order has been shipped',
      delivered: 'Your order has been delivered',
      cancelled: 'Your order has been cancelled'
    };

    await transporter.sendMail({
      from: `"Cookies Café" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: `Order Update - #${order.id.slice(0, 8)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #8B4513;">Order Status Update</h1>
          <p>Hi ${user.name},</p>
          <p><strong>${statusMessages[newStatus] || 'Your order status has been updated'}</strong></p>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Order ID:</strong> #${order.id.slice(0, 8)}</p>
            <p><strong>New Status:</strong> ${newStatus}</p>
          </div>
          
          <a href="${process.env.FRONTEND_URL}/order-tracking/${order.id}" style="display: inline-block; background: #8B4513; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">Track Order</a>
          
          <p style="margin-top: 30px;"><strong>The Cookies Café Team</strong></p>
        </div>
      `
    });
  } catch (error) {
    console.error('Error sending status update email:', error);
  }
};

export const sendEmail = async ({ to, subject, html, text }) => {
  try {
    if (!process.env.EMAIL_USER) {
      console.log('Email service not configured. Skipping email send.');
      return;
    }

    await transporter.sendMail({
      from: `"Cookies Café" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
      text
    });
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export default transporter;
