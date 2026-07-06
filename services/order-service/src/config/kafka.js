import { Kafka } from "kafkajs";
import { env } from "./env.js";
import { logger } from "./logger.js";

// Create Kafka instance
export const kafka = new Kafka({
  clientId: env.KAFKA.CLIENT_ID,
  brokers: env.KAFKA.BROKER,
});

// Producer
export const producer = kafka.producer();

// Consumer factory (we can create multiple consumers if needed)
export const createConsumer = (groupId = env.KAFKA.GROUP_ID) => {
  return kafka.consumer({ groupId });
};

// Connect Producer
export const connectProducer = async () => {
  try {
    await producer.connect();
    logger.info("✅ Kafka Producer connected");
  } catch (err) {
    logger.error("❌ Kafka Producer connection failed", err);
    process.exit(1);
  }
};