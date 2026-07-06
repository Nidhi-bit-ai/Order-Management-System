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

/**
 * =========================
 * GET SYNC LOGS + ORDER STATUS
 * =========================
 */
router.get("/sync/logs", async (req, res) => {
  try {
    // Fetch sync logs
    const [logsResponse, ordersResponse] = await Promise.all([
          forwardRequest(
            `${SERVICES.SYNC}/api/v1/sync/logs`,
            req
          ),
          forwardRequest(
            `${SERVICES.ORDER}/api/v1/orders?source=SYNC&limit=1000`,
            req
          ),
        ]);

    const logs = logsResponse.data.data || [];
    const orders = ordersResponse.data.data || [];

    // Merge current order status into each sync log
    const mergedLogs = logs.map((log) => {
      const order = orders.find(
        (o) => o.orderId === log.omsOrderId
      );

      return {
        ...log,
        orderStatus: order ? order.status : "-",
      };
    });

    return res.status(200).json({
      success: true,
      data: mergedLogs,
    });

  } catch (err) {
    console.error("Sync Logs Error:", err.message);

    return res.status(500).json({
      success: false,
      message: "Unable to load Sync Logs",
    });
  }
});

export default router;