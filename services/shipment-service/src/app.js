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
app.get("/", (req, res) => {
  res.json({
    service: "Shipment Service",
    status: "Running",
  });
});

/**
 * =========================
 * ROUTES
 * =========================
 */
app.use("/api/v1/shipment", shipmentRoutes);

export default app;