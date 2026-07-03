import app from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { initConsumer } from "./kafka/consumer.js";
import { connectProducer } from "./kafka/producer.js";

dotenv.config();

const PORT = process.env.PORT || 5002;

/**
 * =========================
 * START INVENTORY SERVICE
 * =========================
 */
const start = async () => {
  try {
    await connectDB();

    // Kafka setup
    await connectProducer();
    await initConsumer();

    app.listen(PORT, () => {
      console.log(`🚀 Inventory Service running on ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Service failed to start:", error.message);
    process.exit(1);
  }
};

start();