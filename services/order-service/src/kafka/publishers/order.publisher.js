import { producer } from "../../config/kafka.js";
import { logger } from "../../config/logger.js";
import { env } from "../../config/env.js";

/**
 * =========================
 * ORDER CREATED EVENT
 * =========================
 * This event is published whenever a new order is created
 * Other services (Inventory, Shipment, Sync, Analytics) consume it
 */
export const publishOrderCreated = async (order) => {
  try {
    const event = {
      eventType: "ORDER_CREATED",
      timestamp: new Date().toISOString(),

      data: {
        orderId: order.orderId,
        customerId: order.customerId,
        items: order.items, // ✅ IMPORTANT (send all items)
        shippingAddress: order.shippingAddress,
        totalAmount: order.totalAmount,
        status: order.status,
        source: order.source,
      },
    };

    await producer.send({
      topic: "order.created",
      messages: [
        {
          key: order.orderId,
          value: JSON.stringify(event),
        },
      ],
    });

    logger.info(`📤 Kafka event published: order.created → ${order.orderId}`);
  } catch (error) {
    logger.error("❌ Failed to publish order.created event:", error);
    throw error;
  }
};