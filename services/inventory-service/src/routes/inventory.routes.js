import express from "express";

import {
  createProductController,
  getAllProductsController,
  getProductController,
  updateProductController,
  deleteProductController,
  checkStockController,
  restockController,
  reserveStockController,
  releaseStockController,
  getInventoryStatsController
} from "../controllers/inventory.controller.js";

const router = express.Router();

/**
 * =========================
 * PRODUCT MANAGEMENT
 * =========================
 */
// Get inventory stats
router.get("/stats", getInventoryStatsController);

// Create new product
router.post("/", createProductController);
// Get single product by productId
router.get("/:productId", getProductController);
// get all products
router.get("/", getAllProductsController);

// Update product details
router.put("/:productId", updateProductController);
// Delete product
router.delete("/:productId", deleteProductController);

// Check stock
router.get("/:productId/check", checkStockController);

// Restock product
router.put("/:productId/restock", restockController);

// Reserve stock
router.put("/:productId/reserve", reserveStockController);

// Release reserved stock
router.put("/:productId/release", releaseStockController);

export default router;