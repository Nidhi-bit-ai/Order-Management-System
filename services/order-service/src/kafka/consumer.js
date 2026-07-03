import { createConsumer } from "../config/kafka.js";
import { logger } from "../config/logger.js";

// Service layer (business logic)
import { updateOrderStatus } from "../services/order.service.js";

/**
 * =========================
 * KAFKA CONSUMER INITIALIZATION
 * =========================
 * This function starts all Kafka listeners for Order Service
 */
export const initConsumers = async () => {
  const consumer = createConsumer();

  try {
    // Connect consumer to Kafka broker
    await consumer.connect();
    logger.info("📥 Kafka Consumer connected");

    /**
     * =========================
     * SUBSCRIBE TO TOPICS
     * =========================
     * Order Service listens to events from other microservices
     */
    await consumer.subscribe({
        topics: [
            "inventory.reserved",
            "inventory.failed",

            "shipment.created",
            "shipment.packaged",
            "shipment.picked_up",
            "shipment.at_origin_hub",
            "shipment.in_transit",
            "shipment.at_destination_hub",
            "shipment.out_for_delivery",
            "shipment.delivered",
            "shipment.cancelled",

            "sync.order.created",
            "sync.order.updated",
            "sync.order.cancelled",
        ],
        fromBeginning: false,
        });

    /**
     * =========================
     * EVENT HANDLER
     * =========================
     * This runs whenever a message is received from Kafka
     */
    await consumer.run({
      eachMessage: async ({ topic, message }) => {
        try {
            const event = JSON.parse(message.value.toString());
            const data = event.data;

            logger.info(`📩 Kafka event received: ${topic}`);

            const orderId = data?.orderId;

            if (!orderId) {
            logger.warn("⚠️ Missing orderId in Kafka message");
            return;
            }

            switch (topic) {

                case "inventory.reserved":
                    await updateOrderStatus(orderId, "CONFIRMED");
                    break;

                case "inventory.failed":
                    await updateOrderStatus(orderId, "FAILED");
                    break;

                case "shipment.created":
                    await updateOrderStatus(orderId, "PROCESSING");
                    break;

                case "shipment.packaged":
                    await updateOrderStatus(orderId, "PACKAGED");
                    break;

                case "shipment.picked_up":
                    await updateOrderStatus(orderId, "PICKED_UP");
                    break;

                case "shipment.at_origin_hub":
                    await updateOrderStatus(orderId, "AT_ORIGIN_HUB");
                    break;

                case "shipment.in_transit":
                    await updateOrderStatus(orderId, "IN_TRANSIT");
                    break;

                case "shipment.at_destination_hub":
                    await updateOrderStatus(orderId, "AT_DESTINATION_HUB");
                    break;

                case "shipment.out_for_delivery":
                    await updateOrderStatus(orderId, "OUT_FOR_DELIVERY");
                    break;

                case "shipment.delivered":
                    await updateOrderStatus(orderId, "DELIVERED");
                    break;

                case "shipment.cancelled":
                    await updateOrderStatus(orderId, "CANCELLED");
                    break;

                case "sync.order.created":
                    logger.info(`🔄 Sync event ignored for order: ${orderId}`);
                    break;

                case "sync.order.updated":
                    logger.info(`🔄 Sync update received for order: ${orderId}`);
                    break;

                case "sync.order.cancelled":
                    await updateOrderStatus(orderId, "CANCELLED");
                    break;

                default:
                    logger.warn(`⚠️ Unknown topic received: ${topic}`);
                }
        } catch (error) {
            logger.error("❌ Error processing Kafka message:", error);
        }
        },
    });

  } catch (error) {
    logger.error("❌ Kafka Consumer initialization failed:", error);
    process.exit(1);
  }
};