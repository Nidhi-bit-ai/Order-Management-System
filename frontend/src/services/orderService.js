import api from "./api";

// Get all orders
export const getOrders = async () => {
  const response = await api.get("/orders");
  return response.data.data;
};

// Get single order
export const getOrderById = async (orderId) => {
  const response = await api.get(`/orders/${orderId}`);
  return response.data.data;
};

// Create order
export const createOrder = async (orderData) => {
  const response = await api.post("/orders", orderData);
  return response.data.data;
};

// Cancel order
export const cancelOrder = async (orderId) => {
  const response = await api.put(`/orders/${orderId}/cancel`);
  return response.data.data;
};