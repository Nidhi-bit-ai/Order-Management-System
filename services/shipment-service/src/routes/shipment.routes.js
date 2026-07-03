import express from "express";

import {
  getAllShipmentsController,
  getShipmentController,
  packageShipmentController,
  pickupShipmentController,
  moveShipmentController,
  outForDeliveryController,
  deliverShipmentController,
  cancelShipmentController,
  deleteShipmentController,
  shipmentStatsController,
} from "../controllers/shipment.controller.js";

import { getTrackingController,getTrackingTimelineController } from "../controllers/shipment.controller.js";

const router = express.Router();

/**
 * =========================
 * SHIPMENT STATS
 * =========================
 */
router.get("/stats", shipmentStatsController);

/**
 * =========================
 * GET ALL SHIPMENTS
 * =========================
 */
router.get("/", getAllShipmentsController);

/**
 * =========================
 * GET SINGLE SHIPMENT
 * =========================
 */
router.get("/:trackingId", getShipmentController);

/**
 * =========================
 * PACKAGE SHIPMENT
 * =========================
 */
router.put(
  "/:trackingId/package",
  packageShipmentController
);

/**
 * =========================
 * PICKUP SHIPMENT
 * =========================
 */
router.put(
  "/:trackingId/pickup",
  pickupShipmentController
);

/**
 * =========================
 * MOVE TO HUB
 * =========================
 *
 * Body:
 * {
 *   "hubName":"Delhi Hub",
 *   "status":"IN_TRANSIT"
 * }
 */
router.put(
  "/:trackingId/move",
  moveShipmentController
);

/**
 * =========================
 * OUT FOR DELIVERY
 * =========================
 */
router.put(
  "/:trackingId/out-for-delivery",
  outForDeliveryController
);

/**
 * =========================
 * DELIVER SHIPMENT
 * =========================
 */
router.put(
  "/:trackingId/delivered",
  deliverShipmentController
);

/**
 * =========================
 * CANCEL SHIPMENT
 * =========================
 */
router.put(
  "/:trackingId/cancel",
  cancelShipmentController
);

/**
 * =========================
 * DELETE SHIPMENT
 * =========================
 */
router.delete(
  "/:trackingId",
  deleteShipmentController
);

/**
 * =========================
 * TRACK SHIPMENT
 * ========================
 **/
router.get("/:trackingId/tracking", getTrackingController);
router.get("/:trackingId/timeline", getTrackingTimelineController);

export default router;