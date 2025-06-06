import express from 'express';
import cors from 'cors';
// import pinoHttp from 'pino-http';

// Load environment variables
import { SERVER_PORT } from './config/env.js';
import { apiVersion, fullVersion } from './config/apiVersion.js';

// Import routes
import authRoutes from './routes/authRoutes.js';
import boardRoutes from './routes/boardRoutes.js';
import taskRoutes from './routes/tasksRoutes.js';

// Create an Express application
const app = express();

// Middleware
app.use(
  cors({
    origin: [process.env.URL_LOCALHOST_DEVELOP || 'https://your-frontend-domain.com'],
    //  methods: ['GET', 'POST', 'PUT', 'DELETE'],
    //  allowedHeaders: ['Content-Type', 'Authorization'],
    //  exposedHeaders: ['Content-Length', 'X-Total-Count'],
    //  optionsSuccessStatus: 204,
    //  maxAge: 86400, // Cache preflight response for 24 hours
    //  preflightContinue: false,
    credentials: true,
  })
);
app.use(express.json());
// app.use(pinoHttp());

// Set API version and prefix
const apiPrefix = `/api/${apiVersion}`;

// Routes
app.use(`${apiPrefix}/auth`, authRoutes);
app.use(`${apiPrefix}/boards`, boardRoutes);
app.use(`${apiPrefix}/tasks`, taskRoutes);

// Health check route
app.get('/api/version', (req, res) => {
  res.json({
    api: apiVersion,
    app: fullVersion,
    now: new Date(),
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.statusCode || 500).json({
    message: err.message || 'Server Error',
  });
});

// Start the server
app.listen(SERVER_PORT, () => {
  console.log(`Server is running at http://localhost:${SERVER_PORT}`);
});
