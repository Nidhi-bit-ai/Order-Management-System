import express from "express";
import cors from "cors";
import notificationRoutes from "./routes/notification.routes.js";

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/v1/notifications", notificationRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    service: "Notification Service",
    timestamp: new Date().toISOString(),
  });
});

export default app;