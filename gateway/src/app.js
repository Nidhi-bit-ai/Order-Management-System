import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

dotenv.config();

import authRoutes from "./routes/auth.routes.js";
import orderRoutes from "./routes/order.routes.js";
import inventoryRoutes from "./routes/inventory.routes.js";
import shipmentRoutes from "./routes/shipment.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import syncRoutes from "./routes/sync.routes.js";

import gatewayAuth from "./middleware/gatewayAuth.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
  res.json({
    status: "UP",
    service: "API Gateway",
  });
});

/**
 * =========================
 * PUBLIC ROUTES
 * =========================
 */
app.use("/api", authRoutes);

/**
 * =========================
 * JWT PROTECTED ROUTES
 * =========================
 */
app.use(gatewayAuth);

app.use("/api", orderRoutes);
app.use("/api", inventoryRoutes);
app.use("/api", shipmentRoutes);
app.use("/api", notificationRoutes);
app.use("/api", syncRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;