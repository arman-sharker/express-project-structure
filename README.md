# Express Project Structure

A production-ready Express.js project structure with best practices built-in.

## Features
- **Structured architecture**: config, loaders, routes, controllers, services, models, middlewares, utils
- **Environment-based configuration** with dotenv and validation
- **Security & performance**: helmet, CORS (configurable), compression, request timeouts
- **Structured logging**: Pino logger with development pretty-printing, filtered health check logs
- **Input validation**: Joi with comprehensive error details and type information
- **Comprehensive error handling**: http-errors integration with context logging
- **Async error handling**: asyncHandler wrapper for safe error catching
- **HTTP status constants**: Centralized status codes and error messages
- **Testing**: Jest with example tests
- **Code quality**: ESLint + Prettier for consistent formatting

## Quick start
1. Install dependencies
```bash
npm install
```
2. Copy environment file
```bash
cp .env.example .env
```
3. Run in dev mode
```bash
npm run dev
```
4. Build and run production
```bash
npm start
```
5. Run tests
```bash
npm test
```

## Project Structure
```
src/
  app.js                    # Express app configuration and middleware
  server.js                 # HTTP server bootstrap and graceful shutdown
  config/
    index.js                # Centralized config with validation
  loaders/
    logger.js               # Pino logger setup with filtering
  routes/
    index.js                # Main router
    health.route.js         # Health check endpoint
  controllers/
    health.controller.js    # Route handlers (business logic coordination)
  middlewares/
    error.js                # Global error handler with logging
    notFound.js             # 404 handler
    validate.js             # Joi validation middleware
  services/
    index.js                # Business logic (async operations, DB calls)
  models/
    index.js                # Data models and ORM integration
  utils/
    asyncHandler.js         # Wrapper for async route error handling
    httpStatus.js           # HTTP status code constants
    constants.js            # Application error codes and messages
  tests/
    health.e2e.test.js      # End-to-end tests

.env.example                # Environment variables template
.eslintrc.cjs               # ESLint configuration
.prettierrc                 # Prettier formatting rules
.gitignore
.editorconfig
package.json
README.md
```

## ENV
Copy `.env.example` to `.env` and configure for your environment.

### Key Environment Variables
- `NODE_ENV` - Set to `development`, `production`, etc.
- `PORT` - Server port (default: 3000)
- `HOST` - Server host (default: 0.0.0.0)
- `LOG_LEVEL` - Pino log level (default: info)
- `CORS_ORIGIN` - Comma-separated allowed CORS origins
- `CORS_CREDENTIALS` - Enable credentials in CORS (default: false)
- `TRUST_PROXY` - Trust proxy headers (default: false)
- `REQUEST_TIMEOUT` - Request timeout in ms (default: 30000)
- `RESPONSE_TIMEOUT` - Response timeout in ms (default: 30000)
- `JSON_LIMIT` - JSON payload size limit (default: 5mb)
- `URLENCODED_LIMIT` - URL-encoded payload size limit (default: 5mb)

## Best Practices Implemented

### Architecture
- **Separation of concerns**: Clear boundaries between routes, controllers, services, and models
- **Middleware organization**: Security, compression, CORS, logging in proper order
- **Centralized configuration**: All settings in one place with validation

### Error Handling
- **Global error handler**: Catches all errors with structured logging
- **Async error wrapper**: `asyncHandler()` utility for safe async route handlers
- **Proper HTTP status codes**: Using HTTP_STATUS constants throughout
- **Context-aware logging**: Errors include method, path, and user info

### Logging
- **Structured logging**: Pino for machine-readable JSON logs
- **Filtered logs**: Health checks excluded from logs in production
- **Development pretty-printing**: Readable logs during development
- **Request/response tracking**: Full HTTP context logging

### Security
- **Helmet.js**: Security headers by default
- **CORS configuration**: Production-ready origin validation
- **Input validation**: Joi middleware with detailed error messages
- **Environment validation**: Required vars checked at startup

### Performance
- **Compression**: gzip compression enabled
- **Timeouts**: Configurable request/response timeouts
- **Payload limits**: Configurable JSON and URL-encoded limits
- **Connection management**: Keep-alive timeouts for load balancers

## License
MIT
