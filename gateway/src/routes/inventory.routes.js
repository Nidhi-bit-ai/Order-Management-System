import express from "express";
import { SERVICES } from "../config/services.js";
import { forwardRequest } from "../utils/httpClient.js";

const router = express.Router();

/**
 * =========================
 * INVENTORY STATS
 * =========================
 */
router.get("/inventory/stats", async (req, res) => {
  try {
    const response = await forwardRequest(
      `${SERVICES.INVENTORY}/api/v1/inventory/stats`,
      req
    );

    return res.status(response.status).json(response.data);
  } catch (err) {
    console.error("Inventory Stats Error:", err.message);

    return res.status(500).json({
      success: false,
      message: "Unable to connect to Inventory Service",
    });
  }
});

/**
 * =========================
 * PRODUCT CRUD
 * =========================
 */

// Create Product
router.post("/inventory", async (req, res) => {
  try {
    const response = await forwardRequest(
      `${SERVICES.INVENTORY}/api/v1/inventory`,
      req
    );

    return res.status(response.status).json(response.data);
  } catch (err) {
    console.error("Create Product Error:", err.message);

    return res.status(500).json({
      success: false,
      message: "Unable to connect to Inventory Service",
    });
  }
});

// Get All Products
router.get("/inventory", async (req, res) => {
  try {
    const response = await forwardRequest(
      `${SERVICES.INVENTORY}/api/v1/inventory`,
      req
    );

    return res.status(response.status).json(response.data);
  } catch (err) {
    console.error("Get Products Error:", err.message);

    return res.status(500).json({
      success: false,
      message: "Unable to connect to Inventory Service",
    });
  }
});

// Get Product
router.get("/inventory/:productId", async (req, res) => {
  try {
    const response = await forwardRequest(
      `${SERVICES.INVENTORY}/api/v1/inventory/${req.params.productId}`,
      req
    );

    return res.status(response.status).json(response.data);
  } catch (err) {
    console.error("Get Product Error:", err.message);

    return res.status(500).json({
      success: false,
      message: "Unable to connect to Inventory Service",
    });
  }
});

// Update Product
router.put("/inventory/:productId", async (req, res) => {
  try {
    const response = await forwardRequest(
      `${SERVICES.INVENTORY}/api/v1/inventory/${req.params.productId}`,
      req
    );

    return res.status(response.status).json(response.data);
  } catch (err) {
    console.error("Update Product Error:", err.message);

    return res.status(500).json({
      success: false,
      message: "Unable to connect to Inventory Service",
    });
  }
});

// Delete Product
router.delete("/inventory/:productId", async (req, res) => {
  try {
    const response = await forwardRequest(
      `${SERVICES.INVENTORY}/api/v1/inventory/${req.params.productId}`,
      req
    );

    return res.status(response.status).json(response.data);
  } catch (err) {
    console.error("Delete Product Error:", err.message);

    return res.status(500).json({
      success: false,
      message: "Unable to connect to Inventory Service",
    });
  }
});

/**
 * =========================
 * INVENTORY OPERATIONS
 * =========================
 */

// Check Stock
router.get("/inventory/:productId/check", async (req, res) => {
  try {
    const response = await forwardRequest(
      `${SERVICES.INVENTORY}/api/v1/inventory/${req.params.productId}/check`,
      req
    );

    return res.status(response.status).json(response.data);
  } catch (err) {
    console.error("Check Stock Error:", err.message);

    return res.status(500).json({
      success: false,
      message: "Unable to connect to Inventory Service",
    });
  }
});

// Restock
router.put("/inventory/:productId/restock", async (req, res) => {
  try {
    const response = await forwardRequest(
      `${SERVICES.INVENTORY}/api/v1/inventory/${req.params.productId}/restock`,
      req
    );

    return res.status(response.status).json(response.data);
  } catch (err) {
    console.error("Restock Error:", err.message);

    return res.status(500).json({
      success: false,
      message: "Unable to connect to Inventory Service",
    });
  }
});

// Reserve Stock
router.put("/inventory/:productId/reserve", async (req, res) => {
  try {
    const response = await forwardRequest(
      `${SERVICES.INVENTORY}/api/v1/inventory/${req.params.productId}/reserve`,
      req
    );

    return res.status(response.status).json(response.data);
  } catch (err) {
    console.error("Reserve Stock Error:", err.message);

    return res.status(500).json({
      success: false,
      message: "Unable to connect to Inventory Service",
    });
  }
});

// Release Stock
router.put("/inventory/:productId/release", async (req, res) => {
  try {
    const response = await forwardRequest(
      `${SERVICES.INVENTORY}/api/v1/inventory/${req.params.productId}/release`,
      req
    );

    return res.status(response.status).json(response.data);
  } catch (err) {
    console.error("Release Stock Error:", err.message);

    return res.status(500).json({
      success: false,
      message: "Unable to connect to Inventory Service",
    });
  }
});

export default router;