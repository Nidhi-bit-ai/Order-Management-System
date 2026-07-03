import express from "express";
import cors from "cors";
import notificationRoutes from "./routes/notification.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ service: "Notification Service Running" });
});

app.use("/api/v1/notifications", notificationRoutes);

export default app;