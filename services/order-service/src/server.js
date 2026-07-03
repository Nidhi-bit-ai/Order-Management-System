import app from "./app.js";

// Environment config
import { env } from "./config/env.js";

// MongoDB connection
import { connectDB } from "./config/db.js";

// Kafka producer connection
import { connectProducer } from "./config/kafka.js";

// Kafka consumer initialization (NEW)
import { initConsumers } from "./kafka/consumer.js";

// Logger
import { logger } from "./config/logger.js";

import { createTopicsIfNotExists } from "./kafka/admin.js";

/**
 * =========================
 * START ORDER SERVICE
 * =========================
 * This function boots the entire service:
 * DB → Kafka → Consumers → API Server
 */
const startServer = async () => {
  try {
    // =========================
    // 1. Connect to MongoDB
    // =========================
    await connectDB();
    logger.info("📦 MongoDB connected");

    // =========================
    // 2. Connect Kafka Producer
    // =========================
    await connectProducer();
    logger.info("📡 Kafka producer connected");


    await createTopicsIfNotExists();
    logger.info("📦 Kafka topics ensured");
    // =========================
    // 3. Start Kafka Consumers
    // =========================
    // IMPORTANT: This enables event-driven updates
    await initConsumers();
    logger.info("📥 Kafka consumers initialized");

    // =========================
    // 4. Start Express Server
    // =========================
    const PORT = env.PORT;

    app.listen(PORT, () => {
      logger.info(`🚀 Order Service running on port ${PORT}`);
    });

    // =========================
    // 5. Global Error Handlers
    // =========================
    process.on("uncaughtException", (err) => {
      logger.error("💥 Uncaught Exception:", err);
      process.exit(1);
    });

    process.on("unhandledRejection", (err) => {
      logger.error("💥 Unhandled Promise Rejection:", err);
      process.exit(1);
    });

  } catch (error) {
    // If any startup step fails, we stop the service
    logger.error("❌ Failed to start Order Service:", error);
    process.exit(1);
  }
};

// Boot the service
startServer();