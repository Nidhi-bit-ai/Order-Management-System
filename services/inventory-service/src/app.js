import express from "express";
import cors from "cors";
import inventoryRoutes from "./routes/inventory.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

/**
 * =========================
 * ROUTES
 * =========================
 */
app.use("/api/v1/inventory", inventoryRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    service: "Inventory Service",
    timestamp: new Date().toISOString(),
  });
});

export default app;