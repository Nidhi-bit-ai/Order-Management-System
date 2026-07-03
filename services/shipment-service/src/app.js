import express from "express";
import cors from "cors";

import shipmentRoutes from "./routes/shipment.routes.js";

const app = express();

/**
 * =========================
 * MIDDLEWARE
 * =========================
 */
app.use(cors());

app.use(express.json());

/**
 * =========================
 * HEALTH CHECK
 * =========================
 */
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    service: "Shipment Service",
    timestamp: new Date().toISOString(),
  });
});

/**
 * =========================
 * ROUTES
 * =========================
 */
app.use("/api/v1/shipment", shipmentRoutes);

export default app;