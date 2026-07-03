import express from "express";
import { SERVICES } from "../config/services.js";
import { forwardRequest } from "../utils/httpClient.js";

const router = express.Router();

/**
 * =========================
 * SYNC ORDER
 * =========================
 */
router.post("/sync/order", async (req, res) => {
  try {
    const response = await forwardRequest(
      `${SERVICES.SYNC}/api/v1/sync/order`,
      req
    );

    return res.status(response.status).json(response.data);
  } catch (err) {
    console.error("Sync Service Error:", err.message);

    return res.status(err.response?.status || 500).json(
      err.response?.data || {
        success: false,
        message: "Unable to connect to Sync Service",
      }
    );
  }
});

export default router;