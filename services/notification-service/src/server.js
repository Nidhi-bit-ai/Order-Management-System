import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectDB } from "./config/db.js";
import { initConsumer } from "./kafka/consumer.js";

const PORT = process.env.PORT || 5005;

const start = async () => {
  await connectDB();
  await initConsumer();

  app.listen(PORT, () => {
    console.log(`🚀 Notification Service running on ${PORT}`);
  });
};

start();