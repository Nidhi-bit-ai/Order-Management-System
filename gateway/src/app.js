import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import routes from "./routes/index.js";

const app = express();

// =========================
// LOGGER MIDDLEWARE
// =========================
app.use((req, res, next) => {
    console.log("Gateway:", req.method, req.originalUrl);
    next();
});

// =========================
// HEALTH CHECK
// =========================
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    service: "Gateway Service",
    timestamp: new Date().toISOString(),
  });
});

// =========================
// CORE MIDDLEWARES
// =========================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

// =========================
// ROUTES
// =========================
app.use("/api", routes);

export default app;