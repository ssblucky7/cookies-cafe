# Technology Stack

## Programming Languages

### Backend
- **JavaScript (ES6+)**: Node.js runtime with ES modules (`"type": "module"`)
- **Version**: Node.js compatible (modern async/await, import/export syntax)

### Frontend
- **JavaScript (JSX)**: React components with JSX syntax
- **Version**: ES6+ with React 18 features

## Backend Technologies

### Core Framework
- **Express.js 4.18.2**: Web application framework for Node.js
- **Node.js**: JavaScript runtime environment

### Database
- **PostgreSQL**: Primary database (hosted on Supabase)
- **Sequelize 6.35.2**: ORM for database operations and model definitions
- **pg 8.11.3**: PostgreSQL client for Node.js
- **pg-hstore 2.3.4**: Serialization/deserialization for hstore data type

### Authentication & Security
- **jsonwebtoken 9.0.2**: JWT token generation and verification
- **bcryptjs 2.4.3**: Password hashing
- **helmet 7.1.0**: Security headers middleware
- **express-rate-limit 7.1.5**: Rate limiting for API endpoints
- **cors 2.8.5**: Cross-Origin Resource Sharing configuration

### File Upload & Storage
- **multer 1.4.5-lts.1**: Multipart/form-data handling for file uploads
- **cloudinary 2.9.0**: Cloud-based image storage and optimization

### Validation & Utilities
- **express-validator 7.0.1**: Request validation middleware
- **dotenv 16.3.1**: Environment variable management
- **nodemailer 8.0.3**: Email sending service
- **morgan 1.10.0**: HTTP request logger
- **compression 1.7.4**: Response compression middleware

### Development Tools
- **nodemon 3.0.2**: Auto-restart server on file changes

## Frontend Technologies

### Core Framework
- **React 18.2.0**: UI library for building component-based interfaces
- **React DOM 18.2.0**: React rendering for web browsers

### Build Tools
- **Vite 7.0.0**: Fast build tool and development server
- **@vitejs/plugin-react 4.2.1**: Vite plugin for React support

### Routing & HTTP
- **react-router-dom 6.20.0**: Client-side routing
- **axios 1.6.2**: HTTP client for API requests

### UI & Styling
- **Tailwind CSS 3.3.6**: Utility-first CSS framework
- **PostCSS 8.4.32**: CSS transformation tool
- **autoprefixer 10.4.16**: Automatic vendor prefix addition
- **react-icons 4.12.0**: Icon library
- **swiper 12.1.2**: Touch slider/carousel component

## Development Commands

### Backend Commands
```bash
# Start production server
npm start

# Start development server with auto-reload
npm run dev

# Seed database with initial data
npm run seed

# Synchronize database schema
npm run sync
```

### Frontend Commands
```bash
# Start development server (default: http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Configuration Files

### Backend Configuration
- **package.json**: Dependencies, scripts, ES module configuration
- **.env**: Environment variables (database URL, JWT secret, API keys)
- **.env.example**: Template for environment variables
- **server.js**: Main application entry point with middleware setup
- **db.js**: Database connection configuration
- **sync-db.js**: Database synchronization utility

### Frontend Configuration
- **package.json**: Dependencies and build scripts
- **vite.config.js**: Vite build configuration and dev server settings
- **tailwind.config.js**: Tailwind CSS customization
- **postcss.config.js**: PostCSS plugins configuration
- **index.html**: HTML entry point
- **.env**: Environment variables (API base URL)
- **.env.example**: Template for environment variables

## Environment Variables

### Backend (.env)
- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment mode (development/production)
- `DATABASE_URL`: PostgreSQL connection string (Supabase)
- `JWT_SECRET`: Secret key for JWT token signing
- `JWT_EXPIRE`: Token expiration time
- `FRONTEND_URL`: Frontend URL for CORS (default: http://localhost:5173)
- `CLOUDINARY_CLOUD_NAME`: Cloudinary account name
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET`: Cloudinary API secret
- Email service credentials (SMTP configuration)

### Frontend (.env)
- `VITE_API_URL`: Backend API base URL (default: http://localhost:5000/api)

## Database Schema

### ORM: Sequelize
- Models define database tables with relationships
- Associations: hasMany, belongsTo, belongsToMany
- Automatic timestamp fields (createdAt, updatedAt)
- Foreign key constraints and cascading deletes

### Key Models
- User (authentication, profiles)
- Product (catalog items)
- Category (product organization)
- Order (customer orders)
- Review (product ratings)
- Wishlist (saved products)
- CommunityPost (user posts)
- Event (cafe events)

## API Architecture

### REST API Design
- Base URL: `/api`
- Standard HTTP methods: GET, POST, PUT, DELETE
- JSON request/response format
- JWT bearer token authentication
- Rate limiting: 100 requests per 15 minutes per IP

### Middleware Stack
1. Helmet (security headers)
2. Rate limiting
3. CORS
4. Body parser (JSON/URL-encoded)
5. Compression
6. Morgan (logging in development)
7. Route handlers
8. Error handlers (404, global error handler)

## Development Environment

### Recommended Setup
- Node.js (LTS version)
- npm or yarn package manager
- PostgreSQL client (for database inspection)
- Code editor with ESLint/Prettier support
- Git for version control

### Port Configuration
- Backend: Port 5000 (configurable via .env)
- Frontend: Port 5173 (Vite default)
- Database: PostgreSQL on Supabase (remote)
