import { kafka } from "../config/kafka.js";

import {
  createShipment,
  cancelShipmentByOrderId,
} from "../services/shipment.service.js";

/**
 * =========================
 * SHIPMENT CONSUMER
 * =========================
 */
export const initConsumer = async () => {
  const consumer = kafka.consumer({
    groupId: process.env.KAFKA_GROUP_ID,
  });

  await consumer.connect();

  console.log("📥 Shipment Consumer connected");

  await consumer.subscribe({
    topics: [
      "inventory.reserved",
      "order.cancelled",
    ],
    fromBeginning: false,
  });

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      try {
        const event = JSON.parse(message.value.toString());
        const data = event.data;

        switch (topic) {

          /**
           * =========================
           * INVENTORY RESERVED
           * Create shipment only after inventory
           * has been successfully reserved.
           * =========================
           */
          case "inventory.reserved":
            await createShipment(data);
            break;

          /**
           * =========================
           * ORDER CANCELLED
           * =========================
           */
          case "order.cancelled":
            await cancelShipmentByOrderId(data.orderId);
            break;

          default:
            console.log(`Unknown topic: ${topic}`);
        }

      } catch (err) {
        console.error("Shipment Consumer Error:", err.message);
      }
    },
  });
};