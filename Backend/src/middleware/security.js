import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

// Strict rate limiting for all API endpoints
export const strictRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'production' ? 100 : 1000, // 1000 in dev, 100 in production
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false,
  skipFailedRequests: false,
  skip: (req) => {
    // Skip rate limiting for admin users in development
    if (process.env.NODE_ENV !== 'production' && req.user?.role === 'admin') {
      return true;
    }
    return false;
  },
});

// Auth-specific rate limiting (stricter for login/register)
export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'production' ? 5 : 50, // 50 in dev, 5 in production
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again after 15 minutes.',
  },
  skipSuccessfulRequests: true,
  skipFailedRequests: false,
});

// Payment endpoint rate limiting (very strict)
export const paymentRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: process.env.NODE_ENV === 'production' ? 10 : 100, // 100 in dev, 10 in production
  message: {
    success: false,
    message: 'Too many payment attempts, please contact support.',
  },
});

// Upload rate limiting
export const uploadRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'production' ? 20 : 200, // 200 in dev, 20 in production
  message: {
    success: false,
    message: 'Too many upload requests, please try again later.',
  },
});

// Helmet configuration for production security
export const helmetConfig = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:", "https://res.cloudinary.com"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://js.stripe.com"],
      connectSrc: [
        "'self'",
        process.env.FRONTEND_URL || "http://localhost:5173",
        "https://api.stripe.com",
        "https://api.openai.com",
      ],
      frameSrc: ["'self'", "https://js.stripe.com"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: process.env.NODE_ENV === 'production' ? [] : null,
    },
  },
  hsts: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true,
  },
  frameguard: {
    action: 'deny',
  },
  noSniff: true,
  xssFilter: true,
  referrerPolicy: {
    policy: 'strict-origin-when-cross-origin',
  },
});

// IP whitelist middleware (optional - for admin routes)
export const ipWhitelist = (allowedIPs = []) => {
  return (req, res, next) => {
    const clientIP = req.ip || req.connection.remoteAddress;
    
    if (allowedIPs.length === 0 || allowedIPs.includes(clientIP)) {
      return next();
    }
    
    return res.status(403).json({
      success: false,
      message: 'Access denied from this IP address.',
    });
  };
};

// Request size limiter
export const requestSizeLimiter = {
  json: { limit: '10mb' },
  urlencoded: { limit: '10mb', extended: true },
};

// Prevent parameter pollution
export const preventParameterPollution = (req, res, next) => {
  // Remove duplicate query parameters
  for (const key in req.query) {
    if (Array.isArray(req.query[key])) {
      req.query[key] = req.query[key][0];
    }
  }
  next();
};

export default {
  strictRateLimit,
  authRateLimit,
  paymentRateLimit,
  uploadRateLimit,
  helmetConfig,
  ipWhitelist,
  requestSizeLimiter,
  preventParameterPollution,
};
