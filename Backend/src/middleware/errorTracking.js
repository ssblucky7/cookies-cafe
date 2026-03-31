import logger from '../utils/logger.js';

// Error tracking middleware
export const errorTracking = (err, req, res, next) => {
  // Extract error details
  const errorDetails = {
    message: err.message,
    stack: err.stack,
    statusCode: err.statusCode || 500,
    timestamp: new Date().toISOString(),
    request: {
      method: req.method,
      url: req.originalUrl,
      path: req.path,
      query: req.query,
      params: req.params,
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.get('user-agent'),
      referer: req.get('referer'),
    },
    user: req.user ? {
      id: req.user.id,
      email: req.user.email,
      role: req.user.role,
    } : null,
  };

  // Don't log sensitive data in production
  if (process.env.NODE_ENV === 'production') {
    delete errorDetails.stack;
    if (errorDetails.request.query.password) delete errorDetails.request.query.password;
    if (errorDetails.request.params.password) delete errorDetails.request.params.password;
  }

  // Log error based on severity
  if (err.statusCode >= 500) {
    logger.error('Server Error', errorDetails);
  } else if (err.statusCode >= 400) {
    logger.warn('Client Error', errorDetails);
  } else {
    logger.info('Error Occurred', errorDetails);
  }

  // Send error response
  const errorResponse = {
    success: false,
    message: process.env.NODE_ENV === 'production' 
      ? getProductionErrorMessage(err.statusCode)
      : err.message,
    statusCode: err.statusCode || 500,
  };

  // Include stack trace in development
  if (process.env.NODE_ENV !== 'production') {
    errorResponse.stack = err.stack;
    errorResponse.details = errorDetails;
  }

  res.status(err.statusCode || 500).json(errorResponse);
};

// Get user-friendly error messages for production
const getProductionErrorMessage = (statusCode) => {
  const messages = {
    400: 'Bad request. Please check your input.',
    401: 'Authentication required. Please login.',
    403: 'Access denied. You do not have permission.',
    404: 'Resource not found.',
    409: 'Conflict. Resource already exists.',
    422: 'Validation failed. Please check your input.',
    429: 'Too many requests. Please try again later.',
    500: 'Internal server error. Please try again later.',
    502: 'Bad gateway. Service temporarily unavailable.',
    503: 'Service unavailable. Please try again later.',
    504: 'Gateway timeout. Request took too long.',
  };

  return messages[statusCode] || 'An error occurred. Please try again.';
};

// Async error wrapper to catch errors in async route handlers
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Custom error classes
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message) {
    super(message, 400);
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends AppError {
  constructor(message = 'Authentication failed') {
    super(message, 401);
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends AppError {
  constructor(message = 'Access denied') {
    super(message, 403);
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Resource already exists') {
    super(message, 409);
    this.name = 'ConflictError';
  }
}

export class DatabaseError extends AppError {
  constructor(message = 'Database operation failed') {
    super(message, 500);
    this.name = 'DatabaseError';
  }
}

export class ExternalServiceError extends AppError {
  constructor(message = 'External service error') {
    super(message, 502);
    this.name = 'ExternalServiceError';
  }
}

// Handle unhandled promise rejections
export const handleUnhandledRejection = () => {
  process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Promise Rejection', {
      reason: reason,
      promise: promise,
    });
    
    // Exit process in production
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  });
};

// Handle uncaught exceptions
export const handleUncaughtException = () => {
  process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception', {
      error: error.message,
      stack: error.stack,
    });
    
    // Exit process
    process.exit(1);
  });
};

// 404 handler for undefined routes
export const notFoundHandler = (req, res, next) => {
  const error = new NotFoundError(`Route ${req.originalUrl} not found`);
  next(error);
};

// Error response formatter
export const formatErrorResponse = (error) => {
  return {
    success: false,
    message: error.message,
    statusCode: error.statusCode || 500,
    ...(process.env.NODE_ENV !== 'production' && {
      stack: error.stack,
    }),
  };
};

export default {
  errorTracking,
  asyncHandler,
  AppError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ConflictError,
  DatabaseError,
  ExternalServiceError,
  handleUnhandledRejection,
  handleUncaughtException,
  notFoundHandler,
  formatErrorResponse,
};
