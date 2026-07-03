import express from "express";
import { SERVICES } from "../config/services.js";
import { forwardRequest } from "../utils/httpClient.js";

const router = express.Router();

// CREATE ORDER
router.post("/", async (req, res) => {
  try {
    const response = await forwardRequest(
      `${SERVICES.ORDER}/api/v1/orders`,
      req
    );
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data);
  }
});

// GET ALL ORDERS
router.get("/", async (req, res) => {
  try {
    const response = await forwardRequest(
      `${SERVICES.ORDER}/api/v1/orders`,
      req
    );
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data);
  }
});

// GET ORDER BY ID
router.get("/:orderId", async (req, res) => {
  try {
    const response = await forwardRequest(
      `${SERVICES.ORDER}/api/v1/orders/${req.params.orderId}`,
      req
    );
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data);
  }
});

// CANCEL ORDER
router.put("/:orderId/cancel", async (req, res) => {
  try {
    const response = await forwardRequest(
      `${SERVICES.ORDER}/api/v1/orders/${req.params.orderId}/cancel`,
      req
    );
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data);
  }
});

export default router;