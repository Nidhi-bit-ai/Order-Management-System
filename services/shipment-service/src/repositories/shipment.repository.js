import { Shipment } from "../models/shipment.model.js";

/**
 * =========================
 * CREATE SHIPMENT
 * =========================
 */
export const createShipment = async (shipmentData) => {
  return await Shipment.create(shipmentData);
};

/**
 * =========================
 * GET SHIPMENT BY TRACKING ID
 * =========================
 */
export const getShipmentByTrackingId = async (trackingId) => {
  return await Shipment.findOne({ trackingId });
};

/**
 * =========================
 * GET SHIPMENT BY ORDER ID
 * =========================
 */
export const getShipmentByOrderId = async (orderId) => {
  return await Shipment.findOne({ orderId });
};

/**
 * =========================
 * GET ALL SHIPMENTS
 * =========================
 */
export const getAllShipments = async () => {
  return await Shipment.find().sort({ createdAt: -1 });
};

/**
 * =========================
 * UPDATE SHIPMENT
 * =========================
 */
export const updateShipment = async (trackingId, updateData) => {
  return await Shipment.findOneAndUpdate(
    { trackingId },
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );
};

/**
 * =========================
 * DELETE SHIPMENT
 * =========================
 */
export const deleteShipment = async (trackingId) => {
  return await Shipment.findOneAndDelete({
    trackingId,
  });
};

/**
 * =========================
 * GET SHIPMENT STATS
 * =========================
 */
export const getShipmentStats = async () => {
  const shipments = await Shipment.find();

  return {
    totalShipments: shipments.length,

    created: shipments.filter(
      (s) => s.status === "CREATED"
    ).length,

    packaged: shipments.filter(
      (s) => s.status === "PACKAGED"
    ).length,

    pickedUp: shipments.filter(
      (s) => s.status === "PICKED_UP"
    ).length,

    inTransit: shipments.filter(
      (s) =>
        s.status === "IN_TRANSIT" ||
        s.status === "AT_ORIGIN_HUB" ||
        s.status === "AT_DESTINATION_HUB"
    ).length,

    outForDelivery: shipments.filter(
      (s) => s.status === "OUT_FOR_DELIVERY"
    ).length,

    delivered: shipments.filter(
      (s) => s.status === "DELIVERED"
    ).length,

    cancelled: shipments.filter(
      (s) => s.status === "CANCELLED"
    ).length,
  };
};