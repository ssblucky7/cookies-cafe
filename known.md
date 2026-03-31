# Cookies Cafe - Project Documentation

## Project Overview

**Cookies Cafe** is a full-stack **Phygital (Physical + Digital)** bakery/cafe e-commerce platform with AI-powered features. It bridges online ordering with in-store experiences, providing a complete cafe management system.

- **Project Name:** Cookies Cafe
- **Type:** Full-Stack Web Application
- **Architecture:** MERN Stack (PostgreSQL instead of MongoDB)
- **Current Status:** Production-ready with Docker/Redis removed

---

## Tech Stack

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | ES Modules | Runtime |
| Express.js | 4.18.2 | Web Framework |
| PostgreSQL | Latest | Database (Supabase) |
| Sequelize | 6.35.2 | ORM |
| JWT | 9.0.2 | Authentication |
| bcryptjs | 2.4.3 | Password Hashing |
| Socket.IO | 4.6.1 | Real-time Communication |
| Stripe | 14.14.0 | Payment Processing |
| OpenAI | 4.28.0 | GPT-4 & Whisper Integration |
| Cloudinary | 2.9.0 | Image Storage |
| Nodemailer | 8.0.3 | Email Service |
| QRCode | 1.5.3 | QR Code Generation |
| Multer | 1.4.5-lts.1 | File Upload Handling |
| Helmet | 7.1.0 | Security Headers |
| CORS | 2.8.5 | Cross-Origin Resource Sharing |
| Compression | 1.7.4 | Response Compression |
| Morgan | 1.10.0 | HTTP Request Logger |
| express-rate-limit | 7.1.5 | Rate Limiting |
| express-validator | 7.0.1 | Input Validation |

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI Framework |
| Vite | 5.x | Build Tool |
| React Router DOM | 6.20.0 | Routing |
| Tailwind CSS | 3.3.6 | Styling |
| Axios | 1.6.2 | HTTP Client |
| React Icons | 4.12.0 | Icons |
| Swiper | 12.1.2 | Carousels |

### External Services
- **Database:** Supabase PostgreSQL
- **Payment:** Stripe
- **AI:** OpenAI GPT-4 & Whisper
- **Storage:** Cloudinary
- **Email:** SMTP (Gmail)

---

## Project Structure

```
cookies-cafe/
├── Backend/
│   ├── server.js                  # Express server entry point
│   ├── package.json               # Dependencies & scripts
│   ├── .env                       # Environment variables (gitignored)
│   ├── .env.example               # Environment template
│   ├── deploy.sh                  # Production deployment script
│   └── src/
│       ├── config/
│       │   └── database.js        # Sequelize/PostgreSQL connection
│       ├── controllers/           # 19 controller files
│       │   ├── authController.js
│       │   ├── productController.js
│       │   ├── orderController.js
│       │   ├── paymentController.js
│       │   ├── adminController.js
│       │   ├── chatbotController.js
│       │   ├── loyaltyController.js
│       │   ├── qrController.js
│       │   ├── voiceController.js
│       │   ├── storyController.js
│       │   ├── customizationController.js
│       │   ├── analyticsController.js
│       │   ├── notificationController.js
│       │   ├── communityController.js
│       │   ├── eventController.js
│       │   ├── reviewController.js
│       │   ├── uploadController.js
│       │   └── wishlistController.js
│       ├── models/                # 11 Sequelize models
│       │   ├── index.js           # Model relationships
│       │   ├── User.js
│       │   ├── Product.js
│       │   ├── Category.js
│       │   ├── Order.js
│       │   ├── Review.js
│       │   ├── CommunityPost.js
│       │   ├── Event.js
│       │   ├── Wishlist.js
│       │   ├── Story.js
│       │   ├── StoryView.js
│       │   └── CustomProduct.js
│       ├── routes/                # 20 API route files
│       │   ├── authRoutes.js
│       │   ├── productRoutes.js
│       │   ├── categoryRoutes.js
│       │   ├── orderRoutes.js
│       │   ├── paymentRoutes.js
│       │   ├── adminRoutes.js
│       │   ├── chatbotRoutes.js
│       │   ├── loyaltyRoutes.js
│       │   ├── qrRoutes.js
│       │   ├── voiceRoutes.js
│       │   ├── storyRoutes.js
│       │   ├── customizationRoutes.js
│       │   ├── analyticsRoutes.js
│       │   ├── notificationRoutes.js
│       │   ├── communityRoutes.js
│       │   ├── eventRoutes.js
│       │   ├── reviewRoutes.js
│       │   ├── uploadRoutes.js
│       │   ├── wishlistRoutes.js
│       │   └── healthRoutes.js
│       ├── services/              # 12 business logic services
│       │   ├── analyticsService.js
│       │   ├── chatbotService.js
│       │   ├── cloudinaryService.js
│       │   ├── customizationService.js
│       │   ├── emailService.js
│       │   ├── loyaltyService.js
│       │   ├── notificationService.js
│       │   ├── paymentService.js
│       │   ├── qrService.js
│       │   ├── socketService.js
│       │   ├── storyService.js
│       │   └── voiceService.js
│       ├── middleware/            # Express middleware
│       │   ├── auth.js            # JWT authentication
│       │   ├── security.js        # Helmet, rate limits
│       │   ├── validation.js      # Input sanitization
│       │   ├── errorTracking.js   # Error handling
│       │   ├── monitoring.js      # Performance monitoring
│       │   └── upload.js          # Multer configuration
│       ├── utils/
│       │   └── logger.js          # Winston logger
│       ├── migrations/            # Database migrations
│       └── seeders/               # Database seed data
├── Frontend/
│   ├── src/
│   │   ├── App.jsx                # React router setup
│   │   ├── main.jsx               # React entry point
│   │   ├── index.css              # Tailwind styles
│   │   ├── pages/                 # 26 page components
│   │   │   ├── Home.jsx
│       │   │   ├── Menu.jsx
│       │   │   ├── MenuDetail.jsx
│       │   │   ├── OurStory.jsx
│       │   │   ├── Community.jsx
│       │   │   ├── AboutUs.jsx
│       │   │   ├── Contact.jsx
│       │   │   ├── Login.jsx
│       │   │   ├── Register.jsx
│       │   │   ├── Cart.jsx
│       │   │   ├── Checkout.jsx
│       │   │   ├── OrderSuccess.jsx
│       │   │   ├── Profile.jsx
│       │   │   ├── OrderTracking.jsx
│       │   │   ├── Wishlist.jsx
│       │   │   ├── NotFound.jsx
│       │   │   └── admin/         # 10 admin pages
│       │   │       ├── AdminLayout.jsx
│       │   │       ├── Dashboard.jsx
│       │   │       ├── AdminProducts.jsx
│       │   │       ├── AdminOrders.jsx
│       │   │       ├── AdminUsers.jsx
│       │   │       ├── AdminCategories.jsx
│       │   │       ├── AdminReviews.jsx
│       │   │       ├── AdminPosts.jsx
│       │   │       └── AdminSystem.jsx
│   │   ├── components/            # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── FeaturedSection.jsx
│   │   │   ├── GallerySection.jsx
│   │   │   ├── ReviewSection.jsx
│   │   │   ├── LocationSection.jsx
│   │   │   ├── ConnectSection.jsx
│   │   │   ├── admin/
│   │   │   ├── reviews/
│   │   │   └── upload/
│   │   ├── context/               # React context providers
│   │   │   ├── AuthContext.jsx    # Authentication state
│   │   │   └── CartContext.jsx    # Shopping cart state
│   │   ├── services/              # API services
│   │   │   ├── api.js             # Axios instance
│   │   │   └── apiService.js      # API methods
│   │   └── utils/                 # Utility functions
│   ├── package.json
│   └── vite.config.js
├── README.md                      # Project documentation
└── MASTER_AI_PROMPT.md            # Next.js version specification
```

---

## Database Models

### User Model
```javascript
{
  id: UUID (Primary Key),
  name: String (required),
  email: String (required, unique),
  password: String (hashed, bcrypt 12 rounds),
  role: ENUM ['user', 'admin'],
  avatar: String (default: pravatar.cc),
  phone: String,
  address: JSONB (default: {}),
  loyaltyPoints: Integer (default: 0),
  isActive: Boolean (default: true),
  timestamps: true
}
```
- **Relationships:** hasMany Order, hasMany Review, hasMany CommunityPost, hasMany Wishlist, hasMany Story, hasMany CustomProduct
- **Methods:** comparePassword(), toJSON() (excludes password)
- **Hooks:** beforeCreate/beforeUpdate - auto-hash password

### Product Model
```javascript
{
  id: UUID (Primary Key),
  name: String (required),
  slug: String (unique, auto-generated),
  description: Text (required),
  fullDescription: Text,
  price: Decimal(10,2) (required),
  oldPrice: Decimal(10,2),
  categoryId: UUID (Foreign Key),
  image: String (default: unsplash cookie image),
  gallery: Array[String],
  badge: ENUM ['Hot', 'New', 'Sale', 'Offer', 'Discount'],
  rating: Decimal(2,1) (default: 0, min:0, max:5),
  numReviews: Integer (default: 0),
  popularity: Integer (default: 0),
  ingredients: Array[String],
  stock: Integer (default: 100, min:0),
  isActive: Boolean (default: true),
  isFeatured: Boolean (default: false),
  timestamps: true
}
```
- **Relationships:** belongsTo Category, hasMany Review, hasMany Wishlist, hasMany CustomProduct
- **Hooks:** beforeValidate - auto-generate slug from name
- **Methods:** getDiscountPercentage()

### Category Model
```javascript
{
  id: UUID (Primary Key),
  name: String,
  description: Text,
  image: String,
  isActive: Boolean (default: true)
}
```
- **Relationships:** hasMany Product

### Order Model
```javascript
{
  id: UUID (Primary Key),
  userId: UUID (Foreign Key, required),
  orderNumber: String (unique, auto-generated: ORD-{timestamp}-{count}),
  items: JSONB (required, array of order items),
  shippingAddress: JSONB (required),
  paymentMethod: ENUM ['card', 'cash', 'qr', 'stripe'] (required),
  paymentStatus: ENUM ['pending', 'paid', 'failed', 'refunded'] (default: 'pending'),
  stripePaymentIntentId: String,
  qrCode: Text,
  tableNumber: String,
  orderType: ENUM ['delivery', 'pickup', 'dine-in'] (default: 'delivery'),
  estimatedReadyTime: Date,
  loyaltyPointsEarned: Integer (default: 0),
  loyaltyPointsUsed: Integer (default: 0),
  itemsPrice: Decimal(10,2) (required),
  taxPrice: Decimal(10,2) (required),
  shippingPrice: Decimal(10,2) (required),
  totalPrice: Decimal(10,2) (required),
  status: ENUM ['pending', 'processing', 'ready', 'shipped', 'delivered', 'cancelled'] (default: 'pending'),
  deliveredAt: Date,
  notes: Text,
  timestamps: true
}
```
- **Relationships:** belongsTo User
- **Hooks:** beforeCreate - auto-generate order number

### Review Model
```javascript
{
  id: UUID (Primary Key),
  userId: UUID (Foreign Key),
  productId: UUID (Foreign Key),
  rating: Integer (min:1, max:5),
  comment: Text,
  timestamps: true
}
```
- **Relationships:** belongsTo User, belongsTo Product

### CommunityPost Model
```javascript
{
  id: UUID (Primary Key),
  userId: UUID (Foreign Key),
  title: String,
  content: Text,
  image: String,
  likes: Integer (default: 0),
  timestamps: true
}
```
- **Relationships:** belongsTo User

### Event Model
```javascript
{
  id: UUID (Primary Key),
  title: String,
  description: Text,
  date: Date,
  image: String,
  timestamps: true
}
```

### Wishlist Model
```javascript
{
  id: UUID (Primary Key),
  userId: UUID (Foreign Key),
  productId: UUID (Foreign Key),
  timestamps: true
}
```
- **Relationships:** belongsTo User, belongsTo Product

### Story Model (Instagram-like)
```javascript
{
  id: UUID (Primary Key),
  userId: UUID (Foreign Key),
  image: String,
  caption: String,
  expiresAt: Date (24 hours from creation),
  timestamps: true
}
```
- **Relationships:** belongsTo User, hasMany StoryView

### StoryView Model
```javascript
{
  id: UUID (Primary Key),
  storyId: UUID (Foreign Key),
  userId: UUID (Foreign Key),
  timestamps: true
}
```
- **Relationships:** belongsTo Story, belongsTo User

### CustomProduct Model
```javascript
{
  id: UUID (Primary Key),
  userId: UUID (Foreign Key),
  baseProductId: UUID (Foreign Key),
  customizations: JSONB,
  price: Decimal,
  timestamps: true
}
```
- **Relationships:** belongsTo User, belongsTo Product (as baseProduct)

---

## API Routes

### Authentication Routes (`/api/auth`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/register` | Register new user | Public |
| POST | `/login` | Login user | Public |
| GET | `/me` | Get current user | Protected |
| PUT | `/profile` | Update profile | Protected |

### Product Routes (`/api/products`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/` | Get all products | Public |
| GET | `/slug/:slug` | Get product by slug | Public |
| GET | `/featured` | Get featured products | Public |
| GET | `/search` | Search products | Public |
| POST | `/` | Create product | Admin |
| PUT | `/:id` | Update product | Admin |
| DELETE | `/:id` | Delete product | Admin |

### Order Routes (`/api/orders`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/` | Create order | Protected |
| GET | `/my-orders` | Get user's orders | Protected |
| GET | `/:id` | Get order by ID | Protected |
| PUT | `/:id/status` | Update order status | Admin |
| POST | `/:id/cancel` | Cancel order | Protected |

### Payment Routes (`/api/payment`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/create-intent` | Create Stripe payment intent | Protected |
| POST | `/confirm` | Confirm payment | Protected |
| POST | `/webhook` | Stripe webhook | Public |

### Admin Routes (`/api/admin`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/stats` | Dashboard statistics | Admin |
| GET | `/users` | Get all users | Admin |
| GET | `/orders` | Get all orders | Admin |
| GET | `/system/health` | System health check | Admin |

### Chatbot Routes (`/api/chatbot`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/chat` | GPT-4 chat response | Public |
| POST | `/recommendations` | Get product recommendations | Public |
| POST | `/process-order` | Natural language order processing | Protected |
| POST | `/faq` | FAQ answers | Public |
| GET | `/greeting` | Personalized greeting | Protected |

### Loyalty Routes (`/api/loyalty`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/points` | Get user's points | Protected |
| POST | `/redeem` | Redeem points | Protected |
| GET | `/history` | Get loyalty history | Protected |
| GET | `/tier` | Get loyalty tier | Protected |

### Voice Routes (`/api/voice`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/transcribe` | Whisper speech-to-text | Protected |
| POST | `/order` | Voice order processing | Protected |
| POST | `/text-to-speech` | Text-to-speech | Protected |
| POST | `/ai-conversation` | AI voice conversation | Protected |

### QR Routes (`/api/qr`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/generate` | Generate QR code | Protected |
| GET | `/:code` | Get QR code data | Public |
| POST | `/scan` | Scan QR code | Protected |

### Story Routes (`/api/stories`)
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/` | Get all active stories | Public |
| GET | `/active` | Get non-expired stories | Public |
| POST | `/` | Create story | Protected |
| POST | `/:id/view` | Record story view | Protected |
| DELETE | `/:id` | Delete story | Protected |

### Other Routes
- `/api/categories` - Category CRUD
- `/api/wishlist` - Wishlist management
- `/api/reviews` - Product reviews
- `/api/community` - Community posts
- `/api/events` - Events management
- `/api/customize` - Product customization
- `/api/analytics` - Business analytics
- `/api/notifications` - User notifications
- `/api/upload` - Image uploads (Cloudinary)
- `/api/health` - System health checks

---

## Services

### chatbotService.js
- **Purpose:** GPT-4 integration for AI features
- **Functions:**
  - `generateChatResponse(message, context)` - Chatbot conversations
  - `getRecommendations(userPreferences, orderHistory)` - Product recommendations
  - `processNaturalLanguageOrder(orderText, userId)` - Voice/text order processing
  - `answerFAQ(question)` - FAQ answers
  - `generateGreeting(userName, timeOfDay, loyaltyTier)` - Personalized greetings

### paymentService.js
- **Purpose:** Stripe payment processing
- **Functions:**
  - `createPaymentIntent(amount, currency, metadata)` - Create payment
  - `confirmPayment(paymentIntentId)` - Confirm payment status
  - `createRefund(paymentIntentId, amount)` - Process refunds
  - `verifyWebhookSignature(payload, signature)` - Webhook security

### loyaltyService.js
- **Purpose:** Loyalty points management
- **Functions:**
  - Calculate points (10 points per $1 spent)
  - Tier management (Bronze → Silver → Gold → Platinum)
  - Points redemption
  - Discount application (5-15% based on tier)

### notificationService.js
- **Purpose:** Real-time notifications (Socket.IO)
- **Storage:** In-memory Map (Redis removed)
- **Features:** WebSocket notifications, email integration

### analyticsService.js
- **Purpose:** Business analytics and reporting
- **Functions:**
  - Sales analytics
  - Popular products
  - Customer insights
  - Revenue reports

### voiceService.js
- **Purpose:** Voice AI integration (Whisper API)
- **Functions:**
  - Speech-to-text transcription
  - Voice order processing
  - Text-to-speech responses

### qrService.js
- **Purpose:** QR code generation for table ordering
- **Functions:**
  - Generate QR codes
  - QR code scanning
  - Table-based ordering

### storyService.js
- **Purpose:** Instagram-like stories (24h expiry)
- **Functions:**
  - Story lifecycle management
  - View tracking
  - Expiry cleanup

### cloudinaryService.js
- **Purpose:** Image upload and optimization
- **Features:** Image upload, transformation, CDN delivery

### emailService.js
- **Purpose:** SMTP email sending
- **Features:** HTML email templates, order confirmations

### socketService.js
- **Purpose:** WebSocket server setup
- **Features:** Real-time order updates, notifications

### customizationService.js
- **Purpose:** Product customization logic
- **Functions:** Dynamic pricing based on customizations

---

## Frontend Structure

### Pages

#### Public Pages
| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with hero, featured items |
| Menu | `/menu` | Product listing with filters |
| Menu Detail | `/menu/:slug` | Single product detail |
| Our Story | `/gallery` | Cafe story/gallery |
| Community | `/community` | User community posts |
| About Us | `/about` | About the cafe |
| Contact | `/contact` | Contact form |
| Login | `/login` | User authentication |
| Register | `/register` | User registration |

#### User Pages (Protected)
| Page | Route | Description |
|------|-------|-------------|
| Cart | `/cart` | Shopping cart |
| Checkout | `/checkout` | Order checkout |
| Order Success | `/order-success` | Order confirmation |
| Profile | `/profile` | User profile |
| Order Tracking | `/orders/:id` | Track order status |
| Wishlist | `/wishlist` | Saved items |

#### Admin Pages (Admin Only)
| Page | Route | Description |
|------|-------|-------------|
| Dashboard | `/admin` | Statistics overview |
| Products | `/admin/products` | Product CRUD |
| Orders | `/admin/orders` | Order management |
| Users | `/admin/users` | User management |
| Categories | `/admin/categories` | Category CRUD |
| Reviews | `/admin/reviews` | Review moderation |
| Posts | `/admin/posts` | Community moderation |
| System | `/admin/system` | System health |

### Components

#### Layout Components
- **Navbar** - Navigation with cart badge, user menu
- **Footer** - Links, social, contact info
- **AdminLayout** - Sidebar navigation for admin

#### Home Sections
- **HeroSection** - Full-screen hero with CTA
- **FeaturedSection** - Featured products grid
- **GallerySection** - Photo gallery
- **ReviewSection** - Customer testimonials
- **LocationSection** - Cafe location/map
- **ConnectSection** - Social media links

#### Cart Components
- **CartDrawer** - Slide-out cart panel
- **CartItem** - Individual cart item
- **CartSummary** - Cart totals

### Context Providers

#### AuthContext
- **State:** user, loading
- **Methods:** login, register, logout, updateProfile
- **Storage:** localStorage (token, user)

#### CartContext
- **State:** cart items array
- **Methods:** addToCart, removeFromCart, updateQuantity, clearCart
- **Storage:** localStorage
- **Computed:** getTotal(), getItemCount()

---

## Key Features

### 1. AI-Powered Chatbot (GPT-4)
- Menu recommendations based on preferences
- Natural language order processing
- FAQ answering about hours, location, policies
- Personalized greetings based on loyalty tier

### 2. Loyalty Program (4 Tiers)
| Tier | Points Required | Discount |
|------|-----------------|----------|
| Bronze | 0+ | 0% |
| Silver | 2000+ | 5% |
| Gold | 5000+ | 10% |
| Platinum | 10000+ | 15% |

- Earn 10 points per $1 spent
- Points redemption at checkout

### 3. Payment Options
- **Stripe** - Credit/debit cards
- **Cash** - Cash on delivery
- **QR Code** - Scan-to-pay

### 4. Order Types
- **Delivery** - Home delivery
- **Pickup** - In-store pickup
- **Dine-in** - Table service with QR ordering

### 5. Real-time Features (Socket.IO)
- Live order tracking
- Instant notifications
- Admin dashboard updates
- Order status changes

### 6. Stories (Instagram-like)
- 24-hour expiry
- User-generated content
- View tracking
- Admin moderation

### 7. Product Customization
- Build-your-own products
- Size, toppings, extras options
- Dynamic pricing

### 8. Voice Ordering (Whisper API)
- Speech-to-text order input
- AI conversation flow
- Text-to-speech responses

### 9. Security Features
- JWT authentication
- Password hashing (bcrypt, 12 rounds)
- Helmet.js security headers
- Rate limiting (auth, payment, upload specific)
- Input sanitization (XSS, NoSQL injection prevention)
- CORS protection
- File upload size limits

---

## Environment Variables

### Backend (.env)
```env
# Server
PORT=5000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@host:5432/database

# JWT
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# OpenAI
OPENAI_API_KEY=sk-...

# Cloudinary
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=...
EMAIL_PASSWORD=...

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Admin
ADMIN_EMAIL=admin@cookiescafe.com
ADMIN_PASSWORD=Admin@123
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## NPM Scripts

### Backend
```json
{
  "start": "node server.js",
  "dev": "nodemon server.js",
  "seed": "node src/seeders/seed.js",
  "sync": "node sync-db.js",
  "set-admin": "node set-admin.js",
  "create-admin": "node create-admin.js",
  "fix-images": "node fix-image-urls.js",
  "fix-db-urls": "node fix-database-urls.js"
}
```

### Frontend
```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

---

## Security Configuration

### Rate Limits
| Route | Window | Max Requests |
|-------|--------|--------------|
| Default (strict) | 15 min | 100 |
| Auth | 15 min | 10 |
| Payment | 15 min | 20 |
| Upload | 15 min | 5 |
| Admin (dev) | 15 min | 500 |

### CORS Settings
- Origin: FRONTEND_URL or http://localhost:5173
- Credentials: true
- Methods: GET, POST, PUT, DELETE, PATCH
- Allowed Headers: Content-Type, Authorization

### Input Validation
- JSON body size limit: 10MB
- URL encoded limit: 10MB
- Multer file size limit: 100MB
- Max files per upload: 5

---

## Deployment

### Production Checklist
1. Set NODE_ENV=production
2. Configure production DATABASE_URL
3. Set JWT_SECRET (strong, random)
4. Configure Stripe live keys
5. Set up Cloudinary
6. Configure email SMTP
7. Run `npm ci --production`
8. Start with `npm start`

### Deploy Script (deploy.sh)
- Validates NODE_ENV=production
- Checks required environment variables
- Installs production dependencies
- Ready for PM2/Docker deployment

---

## Files Removed (No Longer Used)

The following were removed per user request:
- Docker/Docker Compose configuration
- Redis configuration and caching
- ioredis dependency
- Test files (test-*.js, sync-db.js, set-admin.js, etc.)
- Setup scripts (setup.sh, setup.bat)
- Deployment scripts for Docker

---

## Development Notes

### Database Connection
- Uses Supabase PostgreSQL with connection pooling
- SSL enabled in production
- Automatic retry (max 3 attempts)
- Query logging in development

### Error Handling
- Global error tracking middleware
- Winston logger for structured logging
- Uncaught exception handlers
- Graceful shutdown on SIGTERM

### Performance
- Response compression enabled
- Static file caching
- Database connection pooling (max 20, min 5)
- Query benchmarking in development

---

## API Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## Status Codes

| Code | Usage |
|------|-------|
| 200 | GET success |
| 201 | POST/PUT success (created) |
| 400 | Bad request (validation error) |
| 401 | Unauthorized (no/invalid token) |
| 403 | Forbidden (not admin) |
| 404 | Resource not found |
| 500 | Server error |

---

## Document Information

- **Created:** March 31, 2026
- **Project:** Cookies Cafe
- **Stack:** MERN (PostgreSQL, Express, React, Node.js)
- **Version:** 1.0.0
- **Status:** Production Ready
