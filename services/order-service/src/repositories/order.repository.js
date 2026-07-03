import { Order } from "../models/order.model.js";

/**
 * =========================
 * CREATE ORDER
 * =========================
 * Saves a new order in DB
 */
export const createOrder = async (orderData) => {
  return await Order.create(orderData);
};

/**
 * =========================
 * GET ORDER BY ID
 * =========================
 * Fetch order using orderId (business ID, not Mongo _id)
 */
export const getOrderById = async (orderId) => {
  return await Order.findOne({ orderId });
};

/**
 * =========================
 * GET ALL ORDERS
 * =========================
 * Supports pagination + filtering later
 */
export const getAllOrders = async (filter = {}, options = {}) => {
  const { limit = 10, skip = 0 } = options;

  return await Order.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
};

/**
 * =========================
 * UPDATE ORDER
 * =========================
 * Generic update function
 */
/**
 * =========================
 * UPDATE ORDER
 * =========================
 * Generic update function
 */
export const updateOrder = async (orderId, updateData) => {
  return await Order.findOneAndUpdate(
    { orderId },
    updateData,
    {
      returnDocument: "after",
    }
  );
};

/**
 * =========================
 * DELETE ORDER
 * =========================
 * (Rarely used in real systems, but kept for admin/debug)
 */
export const deleteOrder = async (orderId) => {
  return await Order.findOneAndDelete({ orderId });
};

/**
 * =========================
 * GET ORDERS BY STATUS
 * =========================
 */
export const getOrdersByStatus = async (status) => {
  return await Order.find({ status }).sort({ createdAt: -1 });
};