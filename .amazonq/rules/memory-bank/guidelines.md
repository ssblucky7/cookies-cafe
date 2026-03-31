# Development Guidelines

## Code Quality Standards

### Module System
- **ES Modules**: Use ES6 import/export syntax throughout the codebase
- Backend: `"type": "module"` in package.json enables ES modules
- Frontend: Vite natively supports ES modules
- Always use `.js` extension in import paths for backend files

```javascript
// Backend imports
import express from 'express';
import { User } from '../models/index.js';
import cloudinary from '../config/cloudinary.js';

// Frontend imports
import React from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
```

### File Naming Conventions
- **Backend**: camelCase for files (authController.js, emailService.js)
- **Frontend**: PascalCase for React components (Navbar.jsx, AuthContext.jsx)
- **Configuration**: lowercase with dots (vite.config.js, postcss.config.js)
- **Models**: PascalCase singular (User.js, Product.js, Order.js)

### Code Formatting
- **Indentation**: 2 spaces (consistent across frontend and backend)
- **Semicolons**: Used in backend, optional in frontend JSX
- **Quotes**: Single quotes preferred for strings
- **Line Endings**: CRLF (Windows environment)
- **Trailing Commas**: Used in object/array literals

```javascript
// Backend style
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // logic here
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Frontend style
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  
  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
```

### Documentation Standards
- **JSDoc Comments**: Used for backend functions with @desc, @route, @access tags
- **Inline Comments**: Explain complex logic, not obvious code
- **Function Documentation**: Describe purpose, parameters, and return values

```javascript
// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  // Implementation
};
```

## Backend Development Patterns

### API Response Structure
- **Consistent Format**: All responses include `success` boolean and `data` or `message`
- **Success Responses**: `{ success: true, data: {...} }`
- **Error Responses**: `{ success: false, message: 'error description' }`
- **HTTP Status Codes**: 200 (success), 201 (created), 400 (bad request), 401 (unauthorized), 404 (not found), 500 (server error)

```javascript
// Success response
res.status(200).json({
  success: true,
  data: user,
});

// Error response
res.status(400).json({
  success: false,
  message: 'User already exists',
});
```

### Controller Pattern
- **Async/Await**: All controllers use async/await for asynchronous operations
- **Try-Catch**: Wrap logic in try-catch blocks for error handling
- **Request Validation**: Check required fields before processing
- **Database Queries**: Use Sequelize methods (findOne, findByPk, create, update)

```javascript
export const getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
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
```

### Route Definition Pattern
- **Express Router**: Use express.Router() for modular route definitions
- **Controller Imports**: Import controller functions at top
- **Middleware**: Apply middleware (protect, validate) to specific routes
- **RESTful Conventions**: Use appropriate HTTP methods (GET, POST, PUT, DELETE)

```javascript
import express from 'express';
import { register, login, getMe, updateProfile } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

export default router;
```

### Model Definition Pattern
- **Sequelize Models**: Define models using sequelize.define()
- **UUID Primary Keys**: Use UUID v4 for primary keys instead of auto-increment integers
- **Validation**: Include Sequelize validators (notEmpty, isEmail, len)
- **Hooks**: Use beforeCreate/beforeUpdate for password hashing
- **Instance Methods**: Add custom methods to model prototype
- **JSON Serialization**: Override toJSON() to exclude sensitive fields

```javascript
const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: { msg: 'Please provide a valid email' }
    }
  }
}, {
  timestamps: true,
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 12);
      }
    }
  }
});

User.prototype.toJSON = function() {
  const values = { ...this.get() };
  delete values.password;
  return values;
};
```

### Service Layer Pattern
- **External Integrations**: Abstract third-party APIs into service modules
- **Promise-Based**: Use Promises for asynchronous operations
- **Stream Handling**: Use Node.js streams for file uploads
- **Named Exports**: Export multiple functions from service modules
- **Default Export**: Also provide default object with all functions

```javascript
export const uploadImage = async (fileBuffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: options.folder || 'cookies-cafe/misc',
        transformation: options.transformation || [
          { quality: 'auto', fetch_format: 'auto' }
        ],
      },
      (error, result) => {
        if (error) reject(error);
        else resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    );
    const readableStream = Readable.from(fileBuffer);
    readableStream.pipe(uploadStream);
  });
};

export default {
  uploadImage,
  deleteMedia,
  uploadMultipleImages,
};
```

### Configuration Pattern
- **Environment Variables**: Use process.env for configuration
- **dotenv**: Load environment variables with dotenv.config()
- **Default Values**: Provide fallback values with || operator
- **Configuration Objects**: Export configured instances

```javascript
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
```

### Authentication Pattern
- **JWT Tokens**: Generate tokens with jsonwebtoken library
- **Token Expiration**: Set expiration time from environment variable
- **Password Hashing**: Use bcrypt with salt rounds of 12
- **Middleware Protection**: Use protect middleware for authenticated routes
- **Token Storage**: Return token in response for client-side storage

```javascript
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// In response
res.status(200).json({
  success: true,
  data: {
    id: user.id,
    name: user.name,
    token: generateToken(user.id),
  },
});
```

## Frontend Development Patterns

### Component Structure
- **Functional Components**: Use function declarations for components
- **JSX Extension**: Use .jsx extension for React component files
- **Default Export**: Export component as default at end of file
- **Props Destructuring**: Destructure props in function parameters

```javascript
function Navbar() {
  const { user, logout } = useAuth()
  
  return (
    <nav className="navbar">
      {/* JSX content */}
    </nav>
  )
}

export default Navbar
```

### Context API Pattern
- **Context Creation**: Use createContext() to create context
- **Custom Hook**: Export custom hook (useAuth, useCart) for consuming context
- **Provider Component**: Export Provider component wrapping children
- **Error Handling**: Throw error if hook used outside provider
- **State Management**: Use useState for context state
- **LocalStorage Sync**: Persist state to localStorage where appropriate

```javascript
export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### API Service Pattern
- **Axios Instance**: Create configured axios instance with baseURL
- **Environment Variables**: Use import.meta.env for Vite environment variables
- **Request Interceptors**: Add authentication token to all requests
- **Response Interceptors**: Handle 401 errors globally with redirect
- **Default Headers**: Set Content-Type to application/json

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

### Routing Pattern
- **React Router**: Use react-router-dom v6 for routing
- **BrowserRouter**: Wrap app in Router component
- **Routes/Route**: Define routes with Routes and Route components
- **Nested Providers**: Wrap Router with Context Providers
- **Layout Structure**: Use flex layout with Navbar, main, Footer

```javascript
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}
```

### State Management Pattern
- **useState**: Use for local component state
- **useEffect**: Use for side effects and lifecycle events
- **Context API**: Use for global state (auth, cart)
- **LocalStorage**: Persist important state (token, user, cart)
- **Async State**: Handle loading states for async operations

```javascript
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  checkAuth();
}, []);

const checkAuth = async () => {
  const token = localStorage.getItem('token');
  if (token) {
    setUser(JSON.parse(localStorage.getItem('user')));
  }
  setLoading(false);
};
```

### Styling Pattern
- **Tailwind CSS**: Use utility classes for styling
- **Responsive Design**: Use Tailwind responsive prefixes (sm:, md:, lg:)
- **Flexbox Layout**: Use flex utilities for layouts
- **Component Classes**: Combine multiple utility classes

```javascript
<div className="min-h-screen flex flex-col">
  <nav className="bg-white shadow-md">
    <div className="container mx-auto px-4">
      {/* Content */}
    </div>
  </nav>
</div>
```

## Build Configuration Patterns

### Vite Configuration
- **defineConfig**: Use defineConfig helper for type safety
- **Plugins**: Import and configure plugins (react)
- **Server Config**: Customize dev server port
- **Minimal Config**: Keep configuration simple and focused

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  }
})
```

### PostCSS Configuration
- **Plugin Object**: Export object with plugins property
- **Tailwind Integration**: Include tailwindcss plugin
- **Autoprefixer**: Include autoprefixer for browser compatibility

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## Security Practices

### Backend Security
- **Helmet**: Use helmet middleware for security headers
- **Rate Limiting**: Apply rate limiting to API routes (100 requests per 15 minutes)
- **CORS**: Configure CORS with specific origin and credentials
- **Password Hashing**: Hash passwords with bcrypt (12 salt rounds)
- **JWT Secrets**: Store JWT secret in environment variables
- **Input Validation**: Validate user input before processing

### Frontend Security
- **Token Storage**: Store JWT tokens in localStorage
- **Automatic Logout**: Clear tokens and redirect on 401 responses
- **Protected Routes**: Check authentication before rendering protected pages
- **XSS Prevention**: React automatically escapes JSX content

## Error Handling Patterns

### Backend Error Handling
- **Try-Catch Blocks**: Wrap async operations in try-catch
- **Consistent Error Format**: Return { success: false, message: string }
- **HTTP Status Codes**: Use appropriate status codes for errors
- **Error Messages**: Provide descriptive error messages

### Frontend Error Handling
- **API Error Handling**: Check response.success before processing
- **User Feedback**: Display error messages to users
- **Fallback Values**: Provide default values with || operator
- **Console Logging**: Log errors to console for debugging

## Testing & Development

### Development Workflow
- **Nodemon**: Auto-restart backend server on file changes
- **Vite HMR**: Hot module replacement for frontend development
- **Environment Files**: Use .env for configuration, .env.example for templates
- **Database Seeding**: Use seed scripts for test data

### Code Organization
- **Separation of Concerns**: Controllers handle requests, services handle business logic
- **Single Responsibility**: Each file/function has one clear purpose
- **DRY Principle**: Reuse code through services, utilities, and components
- **Modular Structure**: Organize code by feature/domain
