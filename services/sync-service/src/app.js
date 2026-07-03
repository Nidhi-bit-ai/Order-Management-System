import express from "express";
import cors from "cors";

import ingestRoutes from "./routes/ingest.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    service: "sync-service",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/v1/sync", ingestRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;