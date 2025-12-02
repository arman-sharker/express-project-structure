import { logger } from '../loaders/logger.js';

/**
 * - Error handling with proper logging
 * - Async/await pattern
 * - Type documentation with JSDoc
 */
export const exampleService = async () => {
  try {
    logger.debug('Executing example service');
    return { ok: true, timestamp: new Date().toISOString() };
  } catch (error) {
    logger.error({ error }, 'Example service failed');
    throw error;
  }
};

export default {
  exampleService,
};
