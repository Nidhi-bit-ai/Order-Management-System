import * as shipmentRepository from "../repositories/shipment.repository.js";

import {
  publishShipmentAtOriginHub,
  publishShipmentInTransit,
  publishShipmentAtDestinationHub,
  publishShipmentOutForDelivery,
  publishShipmentDelivered,
} from "../kafka/producer.js";

/**
 * ==========================================
 * MOVE SHIPMENT TO NEXT HUB
 * ==========================================
 */
export const moveToNextHub = async (trackingId) => {
  const shipment =
    await shipmentRepository.getShipmentByTrackingId(trackingId);

  if (!shipment) {
    throw new Error("Shipment not found");
  }

  if (shipment.status === "DELIVERED") {
    throw new Error("Shipment already delivered");
  }

  if (shipment.status === "CANCELLED") {
    throw new Error("Shipment cancelled");
  }

  /**
   * Already reached destination hub
   */
  if (
    shipment.routeIndex >=
    shipment.route.length - 1
  ) {
    throw new Error(
      "Shipment already at destination hub"
    );
  }

  /**
   * Move to next hub
   */
  shipment.routeIndex++;

  const nextHub =
    shipment.route[shipment.routeIndex];

  shipment.currentHub = nextHub.hub;

  shipment.status = "AT_HUB";

  shipment.trackingHistory.push({
    hub: nextHub.hub,
    location: nextHub.city,
    status: "AT_HUB",
    timestamp: new Date(),
  });

  await shipment.save();

  /**
   * Publish Kafka event
   */
  if (shipment.routeIndex === 1) {
    await publishShipmentAtOriginHub(shipment);
  } else if (
    shipment.routeIndex ===
    shipment.route.length - 1
  ) {
    await publishShipmentAtDestinationHub(
      shipment
    );
  } else {
    await publishShipmentInTransit(shipment);
  }

  return shipment;
};

/**
 * ==========================================
 * OUT FOR DELIVERY
 * ==========================================
 */
export const markOutForDelivery = async (
  trackingId
) => {
  const shipment =
    await shipmentRepository.getShipmentByTrackingId(
      trackingId
    );

  if (!shipment) {
    throw new Error("Shipment not found");
  }

  shipment.status = "OUT_FOR_DELIVERY";

  shipment.trackingHistory.push({
    hub: shipment.currentHub,
    location:
      shipment.route[shipment.routeIndex].city,
    status: "OUT_FOR_DELIVERY",
    timestamp: new Date(),
  });

  await shipment.save();

  await publishShipmentOutForDelivery(
    shipment
  );

  return shipment;
};

/**
 * ==========================================
 * DELIVER SHIPMENT
 * ==========================================
 */
export const markDelivered = async (
  trackingId
) => {
  const shipment =
    await shipmentRepository.getShipmentByTrackingId(
      trackingId
    );

  if (!shipment) {
    throw new Error("Shipment not found");
  }

  shipment.status = "DELIVERED";

  shipment.trackingHistory.push({
    hub: shipment.currentHub,
    location:
      shipment.route[shipment.routeIndex].city,
    status: "DELIVERED",
    timestamp: new Date(),
  });

  await shipment.save();

  await publishShipmentDelivered(shipment);

  return shipment;
};