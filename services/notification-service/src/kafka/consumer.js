import { kafka } from "../config/kafka.js";
import { createNotification } from "../services/notification.service.js";
import { getRecipients } from "../utils/router.js";

export const initConsumer = async () => {
  const consumer = kafka.consumer({ groupId: "notification-service" });

  await consumer.connect();
  console.log("📥 Notification Consumer connected");

  await consumer.subscribe({
    topics: [
      "order.created",
      "order.cancelled",

      "shipment.created",
      "shipment.packaged",
      "shipment.picked_up",
      "shipment.at_origin_hub",
      "shipment.in_transit",
      "shipment.at_destination_hub",
      "shipment.out_for_delivery",
      "shipment.delivered",
      "shipment.cancelled",

      "inventory.reserved",
      "inventory.failed",
      "inventory.low_stock_warning",
    ],
    fromBeginning: false,
  });
await consumer.run({
  eachMessage: async ({ topic, message }) => {
    try {
      const event = JSON.parse(message.value.toString());
      const data = event.data;

      console.log("📩 Event received:", topic, data?.orderId);

      if (!data) {
        console.warn("⚠️ Empty event data received");
        return;
      }

      const recipients = getRecipients(topic);

      let title = "";
      let messageText = "";

      switch (topic) {
        case "order.created":
          title = "Order Confirmed";
          messageText = `Your order ${data.orderId} has been placed.`;
          break;

        case "shipment.created":
          title = "Shipment Created";
          messageText = `Your order is being processed for shipment.`;
          break;

        case "shipment.delivered":
          title = "Order Delivered";
          messageText = `Your order has been delivered.`;
          break;

        case "inventory.low_stock_warning":
          title = "Low Stock Alert";
          messageText = `A product is running low on stock.`;
          break;

        case "order.cancelled":
          title = "Order Cancelled";
          messageText = `Your order ${data.orderId} was cancelled.`;
          break;

        default:
          title = "System Update";
          messageText = `You have a new update.`;
      }

      for (const recipientType of recipients) {
        const payload = {
          type: topic.startsWith("inventory")
            ? "INVENTORY"
            : topic.startsWith("shipment")
            ? "SHIPMENT"
            : "ORDER",

          recipientType,

          customerId: data.customerId,
          orderId: data.orderId,
          trackingId: data.trackingId,

          title,
          message: messageText,
        };

        console.log("📝 Saving notification:", payload);

        const result = await createNotification(payload);

        console.log("✅ Notification saved:", result?._id);
      }

    } catch (err) {
      console.error("❌ Notification consumer error:", {
        topic,
        error: err.message,
      });
    }
  },
});
};