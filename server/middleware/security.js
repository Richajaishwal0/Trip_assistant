// Security middleware for environment-based configurations
const rateLimit = require('express-rate-limit');

/**
 * Create rate limiter based on environment variables
 */
const createRateLimiter = () => {
  const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000; // 15 minutes
  const max = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100; // 100 requests per window
  
  return rateLimit({
    windowMs,
    max,
    message: {
      success: false,
      message: 'Too many requests from this IP, please try again later.',
      retryAfter: Math.ceil(windowMs / 1000)
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

/**
 * Security headers middleware
 */
const securityHeaders = (req, res, next) => {
  // Remove powered by header
  res.removeHeader('X-Powered-By');
  
  // Add security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // Only add HSTS in production with HTTPS
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
  
  next();
};

/**
 * Request logging middleware (only in development)
 */
const requestLogger = (req, res, next) => {
  if (process.env.NODE_ENV === 'development' && process.env.VITE_DEBUG_MODE === 'true') {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  }
  next();
};

module.exports = {
  createRateLimiter,
  securityHeaders,
  requestLogger
};
