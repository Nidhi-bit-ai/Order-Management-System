import { kafka } from "../config/kafka.js";

const producer = kafka.producer();

/**
 * =========================
 * CONNECT PRODUCER
 * =========================
 */
export const connectProducer = async () => {
  await producer.connect();
  console.log("📡 Shipment Producer connected");
};

/**
 * Generic Event Publisher
 */
const publish = async (topic, event, shipment) => {
  await producer.send({
    topic,
    messages: [
      {
        key: shipment.orderId,
        value: JSON.stringify({
          event,
          timestamp: new Date().toISOString(),
          data: shipment,
        }),
      },
    ],
  });

  console.log(`📤 ${topic} -> ${shipment.orderId}`);
};

/**
 * =========================
 * SHIPMENT EVENTS
 * =========================
 */

export const publishShipmentCreated = async (shipment) =>
  publish("shipment.created", "SHIPMENT_CREATED", shipment);

export const publishShipmentPackaged = async (shipment) =>
  publish("shipment.packaged", "SHIPMENT_PACKAGED", shipment);

export const publishShipmentPickedUp = async (shipment) =>
  publish("shipment.picked_up", "SHIPMENT_PICKED_UP", shipment);

export const publishShipmentAtOriginHub = async (shipment) =>
  publish("shipment.at_origin_hub", "SHIPMENT_AT_ORIGIN_HUB", shipment);

export const publishShipmentInTransit = async (shipment) =>
  publish("shipment.in_transit", "SHIPMENT_IN_TRANSIT", shipment);

export const publishShipmentAtDestinationHub = async (shipment) =>
  publish(
    "shipment.at_destination_hub",
    "SHIPMENT_AT_DESTINATION_HUB",
    shipment
  );

export const publishShipmentOutForDelivery = async (shipment) =>
  publish(
    "shipment.out_for_delivery",
    "SHIPMENT_OUT_FOR_DELIVERY",
    shipment
  );

export const publishShipmentDelivered = async (shipment) =>
  publish("shipment.delivered", "SHIPMENT_DELIVERED", shipment);

export const publishShipmentCancelled = async (shipment) =>
  publish("shipment.cancelled", "SHIPMENT_CANCELLED", shipment);

export default producer;