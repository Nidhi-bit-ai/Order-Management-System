import api from "./api";

export const getDashboardData = async () => {
  const [
    ordersRes,
    inventoryRes,
    shipmentsRes,
    notificationsRes,
  ] = await Promise.all([
    api.get("/orders"),
    api.get("/inventory/stats"),
    api.get("/shipment"),
    api.get("/notification"),
  ]);

  return {
    orders: ordersRes.data.data,
    inventory: inventoryRes.data.data,
    shipments: shipmentsRes.data.data,
    notifications: notificationsRes.data.data,
  };
};