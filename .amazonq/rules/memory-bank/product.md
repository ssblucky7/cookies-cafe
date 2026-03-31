# Product Overview

## Project Purpose
Cookies Cafe is a full-stack e-commerce web application for a bakery/cafe business. It provides a complete digital storefront with product browsing, ordering, user authentication, community engagement, and administrative management capabilities.

## Value Proposition
- **Customer Experience**: Seamless online ordering system with product catalog, cart management, wishlist functionality, and order tracking
- **Community Building**: Integrated community features for customer engagement through posts and events
- **Business Management**: Comprehensive admin dashboard for managing products, orders, categories, and customer interactions
- **Modern Architecture**: Decoupled frontend/backend architecture enabling scalability and maintainability

## Key Features

### Customer-Facing Features
- **Product Catalog**: Browse cookies, cakes, beverages with detailed product pages and images
- **Shopping Cart**: Add/remove items, adjust quantities, and proceed to checkout
- **User Authentication**: Secure registration, login, and profile management with JWT tokens
- **Wishlist**: Save favorite products for future purchases
- **Order Management**: Place orders, track order status, and view order history
- **Reviews & Ratings**: Submit and view product reviews
- **Community Hub**: Participate in community posts and view upcoming cafe events
- **Responsive Design**: Mobile-friendly interface built with React and Tailwind CSS

### Administrative Features
- **Product Management**: Create, update, delete products with image uploads via Cloudinary
- **Category Management**: Organize products into categories
- **Order Processing**: View and manage customer orders
- **User Management**: Admin dashboard for user oversight
- **Content Management**: Manage community posts and events

### Technical Features
- **Image Management**: Cloudinary integration for optimized image storage and delivery
- **Email Notifications**: Automated email service for order confirmations and updates
- **Security**: Helmet.js, rate limiting, CORS protection, bcrypt password hashing
- **Performance**: Compression middleware, optimized database queries with Sequelize ORM
- **Database**: PostgreSQL (Supabase) for reliable data persistence

## Target Users

### Primary Users
- **Customers**: Individuals looking to order baked goods and beverages online
- **Cafe Staff**: Employees managing day-to-day operations and order fulfillment
- **Administrators**: Business owners/managers overseeing the entire platform

### Use Cases
1. **Online Ordering**: Customers browse menu, add items to cart, and place orders for pickup/delivery
2. **Product Discovery**: Users explore product catalog, read reviews, and save favorites to wishlist
3. **Community Engagement**: Customers participate in community discussions and stay informed about cafe events
4. **Inventory Management**: Admins maintain up-to-date product catalog with pricing and availability
5. **Order Fulfillment**: Staff process incoming orders and update order status for customer tracking
6. **Business Analytics**: Admins monitor sales, popular products, and customer engagement metrics
