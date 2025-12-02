import express from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { logger, httpLogger } from './loaders/logger.js';
import routes from './routes/index.js';
import notFound from './middlewares/notFound.js';
import errorHandler from './middlewares/error.js';
import { config } from './config/index.js';

const app = express();

// ---- Trust proxy ----
if (config.server.trustProxy) {
  app.set('trust proxy', 1);
}

// ---- Core Middleware ----
app.use(helmet());
app.use(
  cors({
    origin: (origin, cb) => {
      const allowed = config.cors.origin
        .split(',')
        .map((o) => o.trim())
        .filter((o) => o);
      if (!origin || allowed.includes('*') || allowed.includes(origin)) {
        return cb(null, true);
      }
      const corsErr = new Error('Not allowed by CORS');
      corsErr.statusCode = 403;
      cb(corsErr);
    },
    credentials: config.cors.credentials,
    methods: config.cors.methods,
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 86400, // 24 hours
  })
);
app.use(compression());
app.use(express.json({ limit: process.env.JSON_LIMIT || '5mb' }));
app.use(express.urlencoded({ extended: true, limit: process.env.URLENCODED_LIMIT || '5mb' }));

// ---- Request Timeout ----
app.use((req, res, next) => {
  req.setTimeout(Number(process.env.REQUEST_TIMEOUT || 30000));
  res.setTimeout(Number(process.env.RESPONSE_TIMEOUT || 30000));
  next();
});

// ---- Logging ----
app.use(httpLogger); // pino-http structured logging

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // dev-only pretty logs
}

// ---- Routes ----
app.get('/', (req, res) => {
  res.json({ message: 'API is running', timestamp: new Date().toISOString() });
});

app.use('/api', routes);

// ---- Error Handling ----
app.use(notFound);
app.use(errorHandler);

export { app };
