/**
 * Wraps async route handlers to catch errors and pass to error middleware
 * @param {Function} fn - Express route handler
 * @returns {Function} Express middleware that handles async errors
 */
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
