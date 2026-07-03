import { kafka } from "../config/kafka.js";
import { logger } from "../config/logger.js";

/**
 * =========================
 * KAFKA TOPIC CREATOR
 * =========================
 * Ensures all required topics exist before consumers start
 */
export const createTopicsIfNotExists = async () => {
  const admin = kafka.admin();

  await admin.connect();
  logger.info("🛠️ Kafka Admin connected");

  const topics = [
    // Order Events
    "order.created",
    "order.updated",
    "order.cancelled",

    // Inventory Events
    "inventory.reserved",
    "inventory.failed",
    "inventory.released", 
    "inventory.low_stock_warning",

    // Shipment Events
    "shipment.created",
    "shipment.shipped",
    "shipment.delivered",

    // External Website Sync
    "sync.order.created",
    "sync.order.updated",
    "sync.order.cancelled",
    ];

  const existingTopics = await admin.listTopics();

  const topicsToCreate = topics.filter((t) => !existingTopics.includes(t));

  if (topicsToCreate.length > 0) {
    await admin.createTopics({
      topics: topicsToCreate.map((topic) => ({
        topic,
        numPartitions: 1,
        replicationFactor: 1,
      })),
    });

    logger.info(`📦 Created Kafka topics: ${topicsToCreate.join(", ")}`);
  } else {
    logger.info("📦 All Kafka topics already exist");
  }

  await admin.disconnect();
};