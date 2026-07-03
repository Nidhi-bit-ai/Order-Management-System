import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import routes from "./routes/index.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    service: "API Gateway",
    status: "UP",
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use("/api", routes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

export default app;