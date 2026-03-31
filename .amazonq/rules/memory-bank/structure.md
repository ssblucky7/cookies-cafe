# Project Structure

## Directory Organization

### Root Structure
```
cookies-cafe/
├── Backend/          # Node.js/Express API server
├── Frontend/         # React/Vite client application
└── .amazonq/         # Amazon Q configuration and rules
```

This is a monorepo structure with separate frontend and backend applications that communicate via REST API.

## Backend Architecture (`/Backend`)

### Core Structure
```
Backend/
├── src/
│   ├── config/       # Configuration files (database, cloudinary)
│   ├── controllers/  # Request handlers and business logic
│   ├── middleware/   # Express middleware (auth, error handling, upload)
│   ├── models/       # Sequelize ORM models (database schemas)
│   ├── routes/       # API route definitions
│   ├── seeders/      # Database seeding scripts
│   ├── services/     # External service integrations (cloudinary, email)
│   └── utils/        # Utility functions and helpers
├── server.js         # Main application entry point
├── db.js             # Database connection setup
├── sync-db.js        # Database synchronization script
└── package.json      # Backend dependencies and scripts
```

### Key Components

#### Models (`/src/models`)
- **User.js**: User accounts with authentication
- **Product.js**: Product catalog items
- **Category.js**: Product categorization
- **Order.js**: Customer orders
- **Review.js**: Product reviews and ratings
- **Wishlist.js**: User saved products
- **CommunityPost.js**: Community engagement posts
- **Event.js**: Cafe events and announcements
- **index.js**: Model associations and relationships

#### Controllers (`/src/controllers`)
Route-specific business logic handlers:
- authController: Registration, login, password management
- productController: Product CRUD operations
- categoryController: Category management
- orderController: Order processing and tracking
- reviewController: Review submission and retrieval
- wishlistController: Wishlist operations
- communityController: Community post management
- eventController: Event management
- adminController: Administrative operations
- uploadController: Image upload handling

#### Routes (`/src/routes`)
API endpoint definitions mapping to controllers:
- `/api/auth` - Authentication endpoints
- `/api/products` - Product operations
- `/api/categories` - Category operations
- `/api/orders` - Order management
- `/api/reviews` - Review operations
- `/api/wishlist` - Wishlist operations
- `/api/community` - Community posts
- `/api/events` - Event management
- `/api/admin` - Admin operations
- `/api/upload` - Image uploads

#### Middleware (`/src/middleware`)
- **auth.js**: JWT authentication and authorization
- **errorHandler.js**: Centralized error handling
- **upload.js**: Multer configuration for file uploads

#### Services (`/src/services`)
- **cloudinaryService.js**: Image upload/management via Cloudinary API
- **emailService.js**: Email notifications via Nodemailer

## Frontend Architecture (`/Frontend`)

### Core Structure
```
Frontend/
├── src/
│   ├── components/   # Reusable React components
│   ├── context/      # React Context providers (state management)
│   ├── pages/        # Page-level components (routes)
│   ├── services/     # API communication layer
│   ├── utils/        # Utility functions and data
│   ├── App.jsx       # Main application component
│   ├── main.jsx      # Application entry point
│   └── index.css     # Global styles
├── Images/           # Static image assets
├── index.html        # HTML template
├── vite.config.js    # Vite build configuration
├── tailwind.config.js # Tailwind CSS configuration
└── package.json      # Frontend dependencies and scripts
```

### Key Components

#### Pages (`/src/pages`)
Route-level components:
- Home.jsx: Landing page
- Menu.jsx: Product catalog
- MenuDetail.jsx: Individual product details
- Cart.jsx: Shopping cart
- Checkout.jsx: Order checkout
- Wishlist.jsx: Saved products
- Community.jsx: Community posts
- Profile.jsx: User profile
- Login.jsx / Register.jsx: Authentication
- OrderTracking.jsx / OrderSuccess.jsx: Order management
- AboutUs.jsx / OurStory.jsx / Contact.jsx: Informational pages
- admin/: Admin dashboard pages

#### Components (`/src/components`)
Reusable UI components:
- Navbar.jsx: Navigation header
- Footer.jsx: Site footer
- HeroSection.jsx: Landing page hero
- FeaturedSection.jsx: Featured products
- GallerySection.jsx: Image gallery
- ReviewSection.jsx: Product reviews display
- ConnectSection.jsx: Social/contact section
- LocationSection.jsx: Store location
- admin/: Admin-specific components
- reviews/: Review-related components
- upload/: Upload functionality components

#### Context (`/src/context`)
- **AuthContext.jsx**: User authentication state management
- **CartContext.jsx**: Shopping cart state management

#### Services (`/src/services`)
- **api.js**: Axios-based API client for backend communication

## Architectural Patterns

### Backend Patterns
- **MVC Architecture**: Models, Controllers, Routes separation
- **Middleware Pipeline**: Request processing through authentication, validation, error handling
- **Service Layer**: External integrations abstracted into services
- **ORM Pattern**: Sequelize for database abstraction and relationships
- **RESTful API**: Standard HTTP methods and resource-based endpoints

### Frontend Patterns
- **Component-Based Architecture**: Reusable React components
- **Context API**: Global state management for auth and cart
- **Page-Component Split**: Route-level pages composed of smaller components
- **Service Layer**: API calls centralized in services directory
- **Utility-First CSS**: Tailwind CSS for styling

### Communication
- **REST API**: Frontend communicates with backend via HTTP/JSON
- **JWT Authentication**: Token-based stateless authentication
- **CORS**: Cross-origin requests configured for frontend-backend communication
