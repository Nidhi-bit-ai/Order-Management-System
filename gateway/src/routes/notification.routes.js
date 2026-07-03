import express from "express";
import { SERVICES } from "../config/services.js";
import { forwardRequest } from "../utils/httpClient.js";

const router = express.Router();

/**
 * =========================
 * GET ALL NOTIFICATIONS
 * =========================
 */
router.get("/notification", async (req, res) => {
  try {
    const response = await forwardRequest(
      `${SERVICES.NOTIFICATION}/api/v1/notifications`,
      req
    );

    return res.status(response.status).json(response.data);
  } catch (err) {
    console.error("Notification Service Error:", err.message);

    return res.status(err.response?.status || 500).json(
      err.response?.data || {
        success: false,
        message: "Unable to connect to Notification Service",
      }
    );
  }
});

/**
 * =========================
 * MARK NOTIFICATION AS READ
 * =========================
 */
router.put("/notification/:id/read", async (req, res) => {
  try {
    const response = await forwardRequest(
      `${SERVICES.NOTIFICATION}/api/v1/notifications/${req.params.id}/read`,
      req
    );

    return res.status(response.status).json(response.data);
  } catch (err) {
    console.error("Notification Service Error:", err.message);

    return res.status(err.response?.status || 500).json(
      err.response?.data || {
        success: false,
        message: "Unable to connect to Notification Service",
      }
    );
  }
});

export default router;