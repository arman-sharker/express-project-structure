# Express App Cookiecutter

A production-ready Express.js project structure you can copy for new services.

## Features
- Structured folders: config, loaders, routes, controllers, services, models, middlewares, utils
- Environment-based config with dotenv
- Security and performance middlewares (helmet, cors, compression)
- Pino logger
- Request validation with Joi
- Error handling with http-errors
- Testing with Jest and Supertest
- Linting and formatting with ESLint + Prettier

## Quick start
1. Install dependencies
```bash
npm install
```
2. Run in dev
```bash
npm run dev
```
3. Build and run
```bash
npm start
```

## Project Structure
```
src/
  app.js                # Express app composition
  server.js             # HTTP server bootstrap
  config/               # Configuration by env
    index.js
  loaders/              # Bootstrapping pieces (e.g., logger)
    logger.js
  routes/               # Route entrypoints
    index.js
    health.route.js
  controllers/
    health.controller.js
  middlewares/
    error.js
    notFound.js
    validate.js
  services/
    index.js
  models/
    index.js
  utils/
    httpStatus.js
  tests/
    health.e2e.test.js

.env.example
.eslintrc.cjs
.prettierrc
.gitignore
.editorconfig
README.md
```

## ENV
Copy `.env.example` to `.env` and adjust.

## License
MIT
