import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

// Same prefix as Gateway target
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    service: "Auth Service",
    timestamp: new Date().toISOString(),
  });
});

export default app;