import { kafka } from "../config/kafka.js";
import { reserveStock, releaseStock } from "../services/inventory.service.js";

export const initConsumer = async () => {
  const consumer = kafka.consumer({
    groupId: process.env.KAFKA_GROUP_ID,
  });

  await consumer.connect();
  console.log("📥 Inventory Consumer connected");

  await consumer.subscribe({
    topic: "order.created",
    fromBeginning: false,
  });

  await consumer.subscribe({
    topic: "order.cancelled",
    fromBeginning: false,
  });

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
        const event = JSON.parse(message.value.toString());
        const order = event.data;

        /**
         * ORDER CREATED
         */
        if (topic === "order.created") {
        await reserveStock(order);
        }

        /**
         * ORDER CANCELLED
         */
        if (topic === "order.cancelled") {
        await releaseStock(order);
        }
    },
    });
};