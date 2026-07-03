import * as shipmentService from "../services/shipment.service.js";
import {
  moveToNextHub,
  markOutForDelivery,
  markDelivered,
} from "../services/hub.service.js";

/**
 * =========================
 * GET ALL SHIPMENTS
 * =========================
 */
export const getAllShipmentsController = async (req, res) => {
  try {
    const shipments = await shipmentService.getAllShipments();

    res.status(200).json({
      success: true,
      count: shipments.length,
      data: shipments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * =========================
 * GET SHIPMENT
 * =========================
 */
export const getShipmentController = async (req, res) => {
  try {
    const shipment = await shipmentService.getShipment(
      req.params.trackingId
    );

    if (!shipment) {
      return res.status(404).json({
        success: false,
        message: "Shipment not found",
      });
    }

    res.status(200).json({
      success: true,
      data: shipment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * =========================
 * PACKAGE SHIPMENT
 * =========================
 */
export const packageShipmentController = async (req, res) => {
  try {
    const shipment =
      await shipmentService.packageShipment(
        req.params.trackingId
      );

    res.status(200).json({
      success: true,
      message: "Shipment packaged",
      data: shipment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * =========================
 * PICKUP SHIPMENT
 * =========================
 */
export const pickupShipmentController = async (req, res) => {
  try {
    const shipment =
      await shipmentService.pickupShipment(
        req.params.trackingId
      );

    res.status(200).json({
      success: true,
      message: "Shipment picked up",
      data: shipment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * =========================
 * MOVE TO NEXT HUB
 * =========================
 */
export const moveShipmentController = async (req, res) => {
  try {
    const shipment = await moveToNextHub(
      req.params.trackingId
    );

    res.status(200).json({
      success: true,
      message: "Shipment moved to next hub",
      data: shipment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * =========================
 * OUT FOR DELIVERY
 * =========================
 */
export const outForDeliveryController = async (
  req,
  res
) => {
  try {
    const shipment = await markOutForDelivery(
      req.params.trackingId
    );

    res.status(200).json({
      success: true,
      message: "Shipment is out for delivery",
      data: shipment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * =========================
 * DELIVER SHIPMENT
 * =========================
 */
export const deliverShipmentController = async (
  req,
  res
) => {
  try {
    const shipment = await markDelivered(
      req.params.trackingId
    );

    res.status(200).json({
      success: true,
      message: "Shipment delivered",
      data: shipment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * =========================
 * CANCEL SHIPMENT
 * =========================
 */
export const cancelShipmentController = async (req, res) => {
  try {
    const shipment =
      await shipmentService.cancelShipment(
        req.params.trackingId
      );

    res.status(200).json({
      success: true,
      data: shipment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * =========================
 * DELETE SHIPMENT
 * =========================
 */
export const deleteShipmentController = async (req, res) => {
  try {
    await shipmentService.deleteShipment(
      req.params.trackingId
    );

    res.status(200).json({
      success: true,
      message: "Shipment deleted",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * =========================
 * SHIPMENT STATS
 * =========================
 */
export const shipmentStatsController = async (req, res) => {
  try {
    const stats =
      await shipmentService.getShipmentStats();

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


import { getTrackingInfo } from "../services/shipment.service.js";

export const getTrackingController = async (req, res) => {
  try {
    const shipment = await shipmentService.getShipment(
      req.params.trackingId
    );

    if (!shipment) {
      return res.status(404).json({
        success: false,
        message: "Shipment not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        trackingId: shipment.trackingId,
        orderId: shipment.orderId,
        status: shipment.status,
        currentHub: shipment.currentHub,
        route: shipment.route,
        routeIndex: shipment.routeIndex,
        trackingHistory: shipment.trackingHistory,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTrackingTimelineController = async (req, res) => {
  try {
    const data = await shipmentService.getTrackingTimeline(
      req.params.trackingId
    );

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};