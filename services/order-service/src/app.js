import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";

import { logger } from "./config/logger.js";

// Import Order Routes
import orderRoutes from "./routes/order.routes.js";

const app = express();

/**
 * =========================
 * GLOBAL MIDDLEWARES
 * =========================
 */

// Parse JSON request bodies
app.use(express.json());

// Parse URL encoded data
app.use(express.urlencoded({ extended: true }));

// Enable CORS for cross-origin requests (frontend/gateway)
app.use(cors());

// Security headers
app.use(helmet());

// Compress API responses for performance
app.use(compression());

// HTTP request logger (integrated with Winston)
app.use(
  morgan("dev", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

/**
 * =========================
 * HEALTH CHECK ROUTE
 * =========================
 * Used by Docker / Kubernetes / monitoring systems
 */
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    service: "order-service",
    timestamp: new Date().toISOString(),
  });
});

/**
 * =========================
 * API ROUTES
 * =========================
 * Versioned API structure (important for production systems)
 */
app.use("/api/v1/orders", orderRoutes);

/**
 * =========================
 * FALLBACK ROUTE
 * =========================
 * Handles unknown endpoints
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;