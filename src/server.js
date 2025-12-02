import http from 'node:http';
import dotenv from 'dotenv';

// ---- Load environment variables once at entrypoint ----
dotenv.config();

import { app } from './app.js';
import { logger } from './loaders/logger.js';

// ---- Helpers ----
function normalizePort(value) {
  const port = parseInt(value, 10);
  if (Number.isNaN(port) || port <= 0) return 3000;
  return port;
}

const PORT = normalizePort(process.env.PORT || '3000');
let HOST = process.env.HOST || '0.0.0.0';
if (HOST === 'localhost') HOST = '127.0.0.1';

// ---- Create HTTP server ----
const server = http.createServer(app);

// Optional: prevent socket hang-up behind load balancers
server.keepAliveTimeout = 65000;
server.headersTimeout = 66000;

// ---- Start server ----
server.listen(PORT, HOST, () => {
  logger.info({ port: PORT, host: HOST }, 'Server listening');
});

// ---- Handle server errors ----
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    logger.error({ err, port: PORT }, 'Port already in use');
    process.exit(1);
  }
  if (err.code === 'EACCES') {
    logger.error({ err, port: PORT }, 'Port requires elevated privileges');
    process.exit(1);
  }
  logger.error({ err }, 'Server error');
  process.exit(1);
});

// ---- Global Error Handling ----
process.on('uncaughtException', (err) => {
  logger.error({ err }, 'Uncaught exception');
  shutdown(1);
});

process.on('unhandledRejection', (reason) => {
  logger.error({ err: reason }, 'Unhandled promise rejection');
  shutdown(1);
});

// ---- Graceful Shutdown ----
let isShuttingDown = false;

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));

function shutdown(code) {
  if (isShuttingDown) return;
  isShuttingDown = true;

  logger.info('Shutting down server...');

  // Safety timer in case close hangs
  const timeout = setTimeout(() => {
    logger.error('Force exit after graceful shutdown timeout');
    process.exit(code || 1);
  }, 10000);
  timeout.unref();

  server.close((err) => {
    if (err) {
      logger.error({ err }, 'Error closing server');
    }
    logger.info('Server closed');
    process.exit(code);
  });
}
