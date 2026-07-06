import { Kafka } from "kafkajs";
// import dotenv from "dotenv";

// dotenv.config();

/**
 * =========================
 * KAFKA CLIENT
 * =========================
 */

export const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID,
  brokers: [String(process.env.KAFKA_BROKER)], // 🔥 force string
});