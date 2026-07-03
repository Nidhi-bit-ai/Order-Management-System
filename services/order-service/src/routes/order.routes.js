import express from "express";

// Controllers (API logic handlers)
import {
  createOrder,
  getOrderById,
  getAllOrders,
  cancelOrder,
  updateOrderStatus,
} from "../controllers/order.controller.js";

const router = express.Router();

/**
 * =========================
 * ORDER ROUTES
 * =========================
 * All endpoints related to order management
 */

// Create a new order
router.post("/", createOrder);

// Get all orders (with optional filters)
router.get("/", getAllOrders);

// Get single order by orderId
router.get("/:orderId", getOrderById);

// Cancel an order
router.put("/:orderId/cancel", cancelOrder);

// Update order status (used internally by Kafka consumers)
router.put("/:orderId/status", updateOrderStatus);

export default router;