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

export default app;