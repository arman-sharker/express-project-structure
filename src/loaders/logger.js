import pino from 'pino';
import pinoHttp from 'pino-http';

const targets = [];

// Always add console transport
if (process.env.NODE_ENV !== 'production') {
  targets.push({ target: 'pino-pretty' });
}

const logger = pino(
  {
    level: process.env.LOG_LEVEL || 'info',
  },
  targets.length > 0 ? pino.transport({ targets }) : undefined
);

const httpLogger = pinoHttp({
  logger,
  autoLogging: {
    ignore: (req) => {
      // Don't log health checks and static assets
      return req.url.includes('/health') || req.url.startsWith('/.well-known');
    },
  },
  customReceivedObject: (req, res, val) => ({
    ...val,
    remoteAddress: req.ip || req.socket.remoteAddress,
  }),
});

export { logger, httpLogger };
