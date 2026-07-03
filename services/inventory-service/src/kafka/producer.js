import { kafka } from "../config/kafka.js";

/**
 * =========================
 * KAFKA PRODUCER
 * =========================
 * Responsible for publishing events to Kafka topics
 */

const producer = kafka.producer();

/**
 * Connect producer once at service start
 */
export const connectProducer = async () => {
  await producer.connect();
  console.log("📡 Kafka Producer connected");
};

/**
 * =========================
 * LOW STOCK EVENT
 * =========================
 * Triggered when inventory falls below threshold
 */
export const emitLowStockEvent = async (product) => {
  try {
    const availableStock = product.totalStock - product.reservedStock;

    await producer.send({
      topic: "inventory.low_stock_warning",
      messages: [
        {
          key: product.productId,

          value: JSON.stringify({
            event: "LOW_STOCK_WARNING",
            productId: product.productId,
            name: product.name,
            category: product.category,
            availableStock,
            threshold: product.lowStockThreshold,
            timestamp: new Date().toISOString(),
          }),
        },
      ],
    });

    console.log(`⚠️ Low stock alert sent for ${product.productId}`);
  } catch (error) {
    console.error("❌ Failed to send low stock event:", error.message);
  }
};

/**
 * Export producer for future events if needed
 */
export const emitInventoryReservedEvent = async (order) => {
  await producer.send({
    topic: "inventory.reserved",
    messages: [
      {
        key: order.orderId,
        value: JSON.stringify({
          event: "INVENTORY_RESERVED",
          timestamp: new Date().toISOString(),

          data: {
            orderId: order.orderId,
            customerId: order.customerId,
            items: order.items,
            shippingAddress: order.shippingAddress,
            totalAmount: order.totalAmount,
          },
        }),
      },
    ],
  });

  console.log(`✅ Inventory reserved for ${order.orderId}`);
};

export const emitInventoryFailedEvent = async (order, reason) => {
  await producer.send({
    topic: "inventory.failed",
    messages: [
      {
        key: order.orderId,
        value: JSON.stringify({
          event: "INVENTORY_FAILED",
          timestamp: new Date().toISOString(),

          data: {
            orderId: order.orderId,
            items: order.items,
            reason,
          },
        }),
      },
    ],
  });
};


export const emitInventoryReleasedEvent = async (order) => {
  await producer.send({
    topic: "inventory.released",
    messages: [
      {
        key: order.orderId,
        value: JSON.stringify({
          event: "INVENTORY_RELEASED",
          timestamp: new Date().toISOString(),

          data: {
            orderId: order.orderId,
            items: order.items,
          },
        }),
      },
    ],
  });

  console.log(`Inventory released for ${order.orderId}`);
};


export default producer;