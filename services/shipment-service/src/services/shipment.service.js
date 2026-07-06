import { v4 as uuidv4 } from "uuid";
// import { randomUUID } from "crypto";
// const id = randomUUID();

import * as shipmentRepository from "../repositories/shipment.repository.js";

import {
  publishShipmentCreated,
  publishShipmentPackaged,
  publishShipmentPickedUp,
  publishShipmentCancelled,
} from "../kafka/producer.js";

import { generateRoute } from "./route.service.js";

/**
 * =====================================
 * COMMON STATUS UPDATE
 * =====================================
 */
const updateShipmentStatus = async (
  shipment,
  status
) => {
  shipment.status = status;

  shipment.trackingHistory.push({
    hub: shipment.currentHub,
    location:
      shipment.route[shipment.routeIndex].city,
    status,
    timestamp: new Date(),
  });

  await shipment.save();

  return shipment;
};

/**
 * =====================================
 * CREATE SHIPMENT
 * =====================================
 */
export const createShipment = async (order) => {
  const existing =
    await shipmentRepository.getShipmentByOrderId(
      order.orderId
    );

  if (existing) {
    console.log(
      `⚠️ Shipment already exists for ${order.orderId}`
    );
    return existing;
  }

  const route = generateRoute(
    order.shippingAddress.city
  );

  const shipment = {
    shipmentId: `SHIP-${uuidv4()}`,

    trackingId: `TRK-${uuidv4()
      .substring(0, 8)
      .toUpperCase()}`,

    orderId: order.orderId,

    customerId: order.customerId,

    items: order.items,

    shippingAddress: order.shippingAddress,

    status: "CREATED",

    route,

    routeIndex: 0,

    currentHub: route[0].hub,

    trackingHistory: [
      {
        hub: route[0].hub,
        location: route[0].city,
        status: "CREATED",
        timestamp: new Date(),
      },
    ],
  };
  console.log("========== SHIPMENT OBJECT ==========");
    
  console.dir(shipment, { depth: null });
    console.log("=====================================");
  const createdShipment =
    await shipmentRepository.createShipment(
      shipment
    );

  await publishShipmentCreated(createdShipment);

  return createdShipment;
};

/**
 * =====================================
 * PACKAGE SHIPMENT
 * =====================================
 */
export const packageShipment = async (
  trackingId
) => {
  const shipment =
    await shipmentRepository.getShipmentByTrackingId(
      trackingId
    );

  if (!shipment)
    throw new Error("Shipment not found");

  const updated =
    await updateShipmentStatus(
      shipment,
      "PACKAGED"
    );

  await publishShipmentPackaged(updated);

  return updated;
};

/**
 * =====================================
 * PICKUP SHIPMENT
 * =====================================
 */
export const pickupShipment = async (
  trackingId
) => {
  const shipment =
    await shipmentRepository.getShipmentByTrackingId(
      trackingId
    );

  if (!shipment)
    throw new Error("Shipment not found");

  const updated =
    await updateShipmentStatus(
      shipment,
      "PICKED_UP"
    );

  await publishShipmentPickedUp(updated);

  return updated;
};

/**
 * =====================================
 * CANCEL SHIPMENT
 * =====================================
 */
export const cancelShipment = async (
  trackingId
) => {
  const shipment =
    await shipmentRepository.getShipmentByTrackingId(
      trackingId
    );

  if (!shipment)
    throw new Error("Shipment not found");

  const updated =
    await updateShipmentStatus(
      shipment,
      "CANCELLED"
    );

  await publishShipmentCancelled(updated);

  return updated;
};

/**
 * =====================================
 * CANCEL BY ORDER ID
 * =====================================
 */
export const cancelShipmentByOrderId = async (
  orderId
) => {
  const shipment =
    await shipmentRepository.getShipmentByOrderId(
      orderId
    );

  if (!shipment)
    throw new Error("Shipment not found");

  const updated =
    await updateShipmentStatus(
      shipment,
      "CANCELLED"
    );

  await publishShipmentCancelled(updated);

  return updated;
};

/**
 * =====================================
 * GET SHIPMENT
 * =====================================
 */
export const getShipment = async (
  trackingId
) => {
  return shipmentRepository.getShipmentByTrackingId(
    trackingId
  );
};

/**
 * =====================================
 * GET ALL SHIPMENTS
 * =====================================
 */
export const getAllShipments = async () => {
  return shipmentRepository.getAllShipments();
};

/**
 * =====================================
 * DELETE SHIPMENT
 * =====================================
 */
export const deleteShipment = async (
  trackingId
) => {
  return shipmentRepository.deleteShipment(
    trackingId
  );
};

/**
 * =====================================
 * SHIPMENT STATS
 * =====================================
 */
export const getShipmentStats = async () => {
  return shipmentRepository.getShipmentStats();
};

export const getTrackingInfo = async (trackingId) => {
  const shipment =
    await shipmentRepository.getShipmentByTrackingId(trackingId);

  if (!shipment) {
    throw new Error("Shipment not found");
  }

  return {
    trackingId: shipment.trackingId,
    orderId: shipment.orderId,
    status: shipment.status,
    currentHub: shipment.currentHub,

    route: shipment.route,
    routeIndex: shipment.routeIndex,

    trackingHistory: shipment.trackingHistory,

    shippingAddress: shipment.shippingAddress,
  };
};

export const getTrackingTimeline = async (trackingId) => {
  const shipment = await shipmentRepository.getShipmentByTrackingId(trackingId);

  if (!shipment) throw new Error("Shipment not found");

  return {
    trackingId: shipment.trackingId,
    status: shipment.status,
    currentHub: shipment.currentHub,

    timeline: shipment.trackingHistory.map((h) => ({
      status: h.status,
      hub: h.hub,
      location: h.location,
      time: h.timestamp,
    })),
  };
};