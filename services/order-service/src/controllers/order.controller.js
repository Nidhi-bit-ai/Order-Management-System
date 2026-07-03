import * as orderService from "../services/order.service.js";
import { logger } from "../config/logger.js";

/**
 * =========================
 * CREATE ORDER CONTROLLER
 * =========================
 */
export const createOrder = async (req, res) => {
  try {
    // Call service layer to handle business logic
    const order = await orderService.createOrder(req.body);

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    logger.error("❌ createOrder controller error:", error.message);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

/**
 * =========================
 * GET ORDER BY ID
 * =========================
 */
export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await orderService.getOrderById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    logger.error("❌ getOrderById error:", error.message);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * =========================
 * GET ALL ORDERS
 * =========================
 */
export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders(req.query);

    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    logger.error("❌ getAllOrders error:", error.message);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * =========================
 * CANCEL ORDER
 * =========================
 */
export const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const updatedOrder = await orderService.cancelOrder(orderId);

    return res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      data: updatedOrder,
    });
  } catch (error) {
    logger.error("❌ cancelOrder error:", error.message);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * =========================
 * UPDATE ORDER STATUS
 * =========================
 * Used by Kafka consumers (internal system)
 */
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const updatedOrder = await orderService.updateOrderStatus(orderId, status);

    return res.status(200).json({
      success: true,
      message: "Order status updated",
      data: updatedOrder,
    });
  } catch (error) {
    logger.error("❌ updateOrderStatus error:", error.message);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};