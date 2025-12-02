// Centralized configuration module
// Reads from process.env (assumes dotenv.config() was called early, e.g., in server.js)

import { logger } from '../loaders/logger.js';

const env = process.env.NODE_ENV || 'development';
const isProd = env === 'production';

const toBool = (v, def = false) => {
  if (v == null) return def;
  const s = String(v).trim().toLowerCase();
  return s === '1' || s === 'true' || s === 'yes' || s === 'on';
};

const toNum = (v, def) => {
  const n = Number(v);
  return Number.isNaN(n) ? def : n;
};

// Validate required environment variables
const validateConfig = () => {
  const errors = [];
  
  if (isProd && !process.env.CORS_ORIGIN) {
    errors.push('CORS_ORIGIN is required in production');
  }

  if (errors.length > 0) {
    logger.error({ errors }, 'Configuration validation failed');
    throw new Error(`Configuration validation failed: ${errors.join(', ')}`);
  }
};

export const config = {
  env,
  isProd,
  server: {
    port: toNum(process.env.PORT, 3000),
    host: process.env.HOST || '0.0.0.0',
    trustProxy: toBool(process.env.TRUST_PROXY, false),
    requestTimeout: toNum(process.env.REQUEST_TIMEOUT, 30000),
    responseTimeout: toNum(process.env.RESPONSE_TIMEOUT, 30000),
  },
  log: {
    level: process.env.LOG_LEVEL || (isProd ? 'info' : 'debug'),
  },
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: (process.env.CORS_METHODS || 'GET,HEAD,PUT,PATCH,POST,DELETE')
      .split(',')
      .map((m) => m.trim()),
    credentials: toBool(process.env.CORS_CREDENTIALS, false),
  },
  security: {
    helmet: {
      contentSecurityPolicy: true,
      crossOriginEmbedderPolicy: true,
    },
  },
};

// Validate config on import
if (isProd) {
  validateConfig();
}

export default config;
