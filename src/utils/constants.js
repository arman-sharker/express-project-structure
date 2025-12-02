/**
 * Application-wide constants for error handling and validation
 */

export const ERROR_MESSAGES = {
  // Validation errors
  VALIDATION_ERROR: 'Validation error',
  INVALID_INPUT: 'Invalid input provided',

  // Authentication/Authorization
  UNAUTHORIZED: 'Unauthorized',
  FORBIDDEN: 'Access forbidden',
  INVALID_CREDENTIALS: 'Invalid credentials',

  // Resource errors
  NOT_FOUND: 'Resource not found',
  ALREADY_EXISTS: 'Resource already exists',
  CONFLICT: 'Conflict with existing resource',

  // Server errors
  INTERNAL_ERROR: 'Internal server error',
  SERVICE_UNAVAILABLE: 'Service temporarily unavailable',

  // CORS errors
  CORS_ERROR: 'Not allowed by CORS',
};

export const ERROR_CODES = {
  // Validation
  VALIDATION_FAILED: 'VALIDATION_FAILED',
  INVALID_INPUT: 'INVALID_INPUT',

  // Auth
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',

  // Resource
  NOT_FOUND: 'NOT_FOUND',
  ALREADY_EXISTS: 'ALREADY_EXISTS',
  CONFLICT: 'CONFLICT',

  // Server
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
};

export default {
  ERROR_MESSAGES,
  ERROR_CODES,
};
