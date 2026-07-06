import express from "express";
import { SERVICES } from "../config/services.js";
import { forwardRequest } from "../utils/httpClient.js";

const router = express.Router();

// Create Order
router.post("/orders", async (req, res) => {
  try {
    const response = await forwardRequest(
      `${SERVICES.ORDER}/api/v1/orders`,
      req
    );

    return res.status(response.status).json(response.data);
  } catch (err) {
    console.error("Gateway Order Error:", err.message);

    return res.status(500).json({
      success: false,
      message: "Unable to connect to Order Service",
    });
  }
});

// Get All Orders
router.get("/orders", async (req, res) => {
  try {
    const response = await forwardRequest(
      `${SERVICES.ORDER}/api/v1/orders`,
      req
    );

    return res.status(response.status).json(response.data);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Unable to connect to Order Service",
    });
  }
});

// Get Order By ID
router.get("/orders/:orderId", async (req, res) => {
  try {
    const response = await forwardRequest(
      `${SERVICES.ORDER}/api/v1/orders/${req.params.orderId}`,
      req
    );

    return res.status(response.status).json(response.data);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Unable to connect to Order Service",
    });
  }
});

// Cancel Order
router.put("/orders/:orderId/cancel", async (req, res) => {
  try {
    const response = await forwardRequest(
      `${SERVICES.ORDER}/api/v1/orders/${req.params.orderId}/cancel`,
      req
    );

    return res.status(response.status).json(response.data);
  } catch (err) {
    console.error("Gateway Cancel Order Error:", err.message);

    return res.status(500).json({
      success: false,
      message: "Unable to connect to Order Service",
    });
  }
});

export default router;