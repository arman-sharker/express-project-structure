/* eslint-disable no-unused-vars */
import createError from 'http-errors';
import { logger } from '../loaders/logger.js';

export default function errorHandler(err, req, res, next) {
  // Ensure err is an Error object
  const error = err instanceof Error ? err : new Error(String(err));
  
  // Create HTTP error with proper status code
  const statusCode = error.statusCode || error.status || 500;
  const httpErr = createError(statusCode, error.message || 'Internal Server Error');
  
  // Log error context
  logger.error({
    err: error,
    status: httpErr.status,
    method: req.method,
    url: req.url,
    userId: req.user?.id,
  }, 'Request error');
  
  // Build response payload
  const payload = {
    message: httpErr.message,
    ...(process.env.NODE_ENV !== 'production' && { stack: error.stack }),
  };
  
  res.status(httpErr.status).json(payload);
}
