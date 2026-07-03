import { v4 as uuidv4 } from "uuid";

// Repository layer (DB access only)
import * as orderRepository from "../repositories/order.repository.js";

// Kafka publisher (we will implement next step)
import { publishOrderCreated } from "../kafka/publishers/order.publisher.js";

// Logger for debugging and tracking flow
import { logger } from "../config/logger.js";

/**
 * =========================
 * CREATE ORDER
 * =========================
 * Main business flow when a new order is created
 */
export const createOrder = async (orderData) => {
  try {
    // 1. Generate unique business order ID
    const orderId = `ORD-${uuidv4()}`;

    // 2. Calculate subtotal from items
    const subtotal = orderData.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    // 3. Basic tax calculation (can be improved later)
    const tax = subtotal * 0.18;

    // 4. Shipping cost (static for now)
    const shippingCost = 50;

    // 5. Final total
    const totalAmount = subtotal + tax + shippingCost;

    // 6. Build final order object
    const order = {
        orderId,

        externalOrderId: orderData.externalOrderId || null,

        customerId: orderData.customerId,

        items: orderData.items,

        subtotal,
        tax,
        shippingCost,
        totalAmount,

        shippingAddress: orderData.shippingAddress,

        source: orderData.source || "SYNC",

        status: "CREATED",
        };

    // 7. Save to database
    const createdOrder = await orderRepository.createOrder(order);

    logger.info(`📦 Order created: ${orderId}`);

    // 8. Publish event to Kafka
    await publishOrderCreated(createdOrder);

    return createdOrder;
  } catch (error) {
    logger.error("❌ Error creating order:", error);
    throw error;
  }
};

/**
 * =========================
 * GET ORDER BY ID
 * =========================
 */
export const getOrderById = async (orderId) => {
  return await orderRepository.getOrderById(orderId);
};

/**
 * =========================
 * GET ALL ORDERS
 * =========================
 */
export const getAllOrders = async (query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;

  const skip = (page - 1) * limit;

  const filter = {};

  if (query.status) {
    filter.status = query.status;
  }

  return await orderRepository.getAllOrders(filter, { limit, skip });
};

/**
 * =========================
 * CANCEL ORDER
 * =========================
 */
export const cancelOrder = async (orderId) => {
  const order = await orderRepository.getOrderById(orderId);

  if (!order) {
    throw new Error("Order not found");
  }

  if (order.status === "SHIPPED" || order.status === "DELIVERED") {
    throw new Error("Cannot cancel shipped/delivered order");
  }

  const updatedOrder = await orderRepository.updateOrder(orderId, {
    status: "CANCELLED",
  });

  logger.info(`❌ Order cancelled: ${orderId}`);

  return updatedOrder;
};

/**
 * =========================
 * UPDATE ORDER STATUS
 * =========================
 * Used by Inventory/Shipment services via Kafka
 */
export const updateOrderStatus = async (orderId, status) => {
  const updatedOrder = await orderRepository.updateOrder(orderId, {
    status,
  });

  logger.info(`🔄 Order status updated: ${orderId} → ${status}`);

  return updatedOrder;
};