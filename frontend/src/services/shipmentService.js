import api from "./api";

// Get all shipments
export const getShipments = async () => {
  const response = await api.get("/shipment");
  return response.data.data;
};

// Get single shipment
export const getShipment = async (trackingId) => {
  const response = await api.get(`/shipment/${trackingId}`);
  return response.data.data;
};

// Package shipment
export const packageShipment = async (trackingId) => {
  const response = await api.put(`/shipment/${trackingId}/package`);
  return response.data.data;
};

// Pickup shipment
export const pickupShipment = async (trackingId) => {
  const response = await api.put(`/shipment/${trackingId}/pickup`);
  return response.data.data;
};

// Move shipment
export const moveShipment = async (trackingId) => {
  const response = await api.put(
    `/shipment/${trackingId}/move`
  );

  return response.data.data;
};

// Out for delivery
export const outForDelivery = async (trackingId) => {
  const response = await api.put(
    `/shipment/${trackingId}/out-for-delivery`
  );

  return response.data.data;
};

// Deliver shipment
export const deliverShipment = async (trackingId) => {
  const response = await api.put(
    `/shipment/${trackingId}/delivered`
  );

  return response.data.data;
};

// Cancel shipment
export const cancelShipment = async (trackingId) => {
  const response = await api.put(
    `/shipment/${trackingId}/cancel`
  );

  return response.data.data;
};

// Tracking
export const getTracking = async (trackingId) => {
  const response = await api.get(
    `/shipment/${trackingId}/tracking`
  );

  return response.data.data;
};

// Timeline
export const getTimeline = async (trackingId) => {
  const response = await api.get(
    `/shipment/${trackingId}/timeline`
  );

  return response.data.data;
};

// Statistics
export const getShipmentStats = async () => {
  const response = await api.get("/shipment/stats");
  return response.data.data;
};