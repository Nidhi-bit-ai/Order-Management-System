import { Kafka } from "kafkajs";
import dotenv from "dotenv";

dotenv.config();

/**
 * =========================
 * KAFKA CLIENT
 * =========================
 */
export const kafka = new Kafka({
  clientId: "inventory-service",
  brokers: [process.env.KAFKA_BROKERs],
});