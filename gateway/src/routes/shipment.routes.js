import express from "express";
import { SERVICES } from "../config/services.js";
import { forwardRequest } from "../utils/httpClient.js";

const router = express.Router();

/**
 * =========================
 * SHIPMENT STATS
 * =========================
 */
router.get("/shipment/stats", async (req, res) => {
  try {
    const response = await forwardRequest(
      `${SERVICES.SHIPMENT}/api/v1/shipment/stats`,
      req
    );

    return res.status(response.status).json(response.data);
  } catch (err) {
    console.error("Shipment Stats Error:", err.message);

    return res.status(500).json({
      success: false,
      message: "Unable to connect to Shipment Service",
    });
  }
});

/**
 * =========================
 * GET ALL SHIPMENTS
 * =========================
 */
router.get("/shipment", async (req, res) => {
  try {
    const response = await forwardRequest(
      `${SERVICES.SHIPMENT}/api/v1/shipment`,
      req
    );

    return res.status(response.status).json(response.data);
  } catch (err) {
    console.error("Get Shipments Error:", err.message);

    return res.status(500).json({
      success: false,
      message: "Unable to connect to Shipment Service",
    });
  }
});

/**
 * =========================
 * GET SINGLE SHIPMENT
 * =========================
 */
router.get("/shipment/:trackingId", async (req, res) => {
  try {
    const response = await forwardRequest(
      `${SERVICES.SHIPMENT}/api/v1/shipment/${req.params.trackingId}`,
      req
    );

    return res.status(response.status).json(response.data);
  } catch (err) {
    console.error("Get Shipment Error:", err.message);

    return res.status(500).json({
      success: false,
      message: "Unable to connect to Shipment Service",
    });
  }
});

/**
 * =========================
 * PACKAGE SHIPMENT
 * =========================
 */
router.put("/shipment/:trackingId/package", async (req, res) => {
  try {
    const response = await forwardRequest(
      `${SERVICES.SHIPMENT}/api/v1/shipment/${req.params.trackingId}/package`,
      req
    );

    return res.status(response.status).json(response.data);
  } catch (err) {
    console.error("Package Shipment Error:", err.message);

    return res.status(500).json({
      success: false,
      message: "Unable to connect to Shipment Service",
    });
  }
});

/**
 * =========================
 * PICKUP SHIPMENT
 * =========================
 */
router.put("/shipment/:trackingId/pickup", async (req, res) => {
  try {
    const response = await forwardRequest(
      `${SERVICES.SHIPMENT}/api/v1/shipment/${req.params.trackingId}/pickup`,
      req
    );

    return res.status(response.status).json(response.data);
  } catch (err) {
    console.error("Pickup Shipment Error:", err.message);

    return res.status(500).json({
      success: false,
      message: "Unable to connect to Shipment Service",
    });
  }
});

/**
 * =========================
 * MOVE SHIPMENT
 * =========================
 */
router.put("/shipment/:trackingId/move", async (req, res) => {
  try {
    const response = await forwardRequest(
      `${SERVICES.SHIPMENT}/api/v1/shipment/${req.params.trackingId}/move`,
      req
    );

    return res.status(response.status).json(response.data);
  } catch (err) {
    console.error("Move Shipment Error:", err.message);

    return res.status(500).json({
      success: false,
      message: "Unable to connect to Shipment Service",
    });
  }
});

/**
 * =========================
 * OUT FOR DELIVERY
 * =========================
 */
router.put("/shipment/:trackingId/out-for-delivery", async (req, res) => {
  try {
    const response = await forwardRequest(
      `${SERVICES.SHIPMENT}/api/v1/shipment/${req.params.trackingId}/out-for-delivery`,
      req
    );

    return res.status(response.status).json(response.data);
  } catch (err) {
    console.error("Out For Delivery Error:", err.message);

    return res.status(500).json({
      success: false,
      message: "Unable to connect to Shipment Service",
    });
  }
});

/**
 * =========================
 * DELIVER SHIPMENT
 * =========================
 */
router.put("/shipment/:trackingId/delivered", async (req, res) => {
  try {
    const response = await forwardRequest(
      `${SERVICES.SHIPMENT}/api/v1/shipment/${req.params.trackingId}/delivered`,
      req
    );

    return res.status(response.status).json(response.data);
  } catch (err) {
    console.error("Deliver Shipment Error:", err.message);

    return res.status(500).json({
      success: false,
      message: "Unable to connect to Shipment Service",
    });
  }
});

/**
 * =========================
 * CANCEL SHIPMENT
 * =========================
 */
router.put("/shipment/:trackingId/cancel", async (req, res) => {
  try {
    const response = await forwardRequest(
      `${SERVICES.SHIPMENT}/api/v1/shipment/${req.params.trackingId}/cancel`,
      req
    );

    return res.status(response.status).json(response.data);
  } catch (err) {
    console.error("Cancel Shipment Error:", err.message);

    return res.status(500).json({
      success: false,
      message: "Unable to connect to Shipment Service",
    });
  }
});

/**
 * =========================
 * DELETE SHIPMENT
 * =========================
 */
router.delete("/shipment/:trackingId", async (req, res) => {
  try {
    const response = await forwardRequest(
      `${SERVICES.SHIPMENT}/api/v1/shipment/${req.params.trackingId}`,
      req
    );

    return res.status(response.status).json(response.data);
  } catch (err) {
    console.error("Delete Shipment Error:", err.message);

    return res.status(500).json({
      success: false,
      message: "Unable to connect to Shipment Service",
    });
  }
});

/**
 * =========================
 * TRACK SHIPMENT
 * =========================
 */
router.get("/shipment/:trackingId/tracking", async (req, res) => {
  try {
    const response = await forwardRequest(
      `${SERVICES.SHIPMENT}/api/v1/shipment/${req.params.trackingId}/tracking`,
      req
    );

    return res.status(response.status).json(response.data);
  } catch (err) {
    console.error("Tracking Error:", err.message);

    return res.status(500).json({
      success: false,
      message: "Unable to connect to Shipment Service",
    });
  }
});

/**
 * =========================
 * TRACKING TIMELINE
 * =========================
 */
router.get("/shipment/:trackingId/timeline", async (req, res) => {
  try {
    const response = await forwardRequest(
      `${SERVICES.SHIPMENT}/api/v1/shipment/${req.params.trackingId}/timeline`,
      req
    );

    return res.status(response.status).json(response.data);
  } catch (err) {
    console.error("Timeline Error:", err.message);

    return res.status(500).json({
      success: false,
      message: "Unable to connect to Shipment Service",
    });
  }
});

export default router;