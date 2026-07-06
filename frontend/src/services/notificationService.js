import api from "./api";

export const getNotifications = async () => {
  const res = await api.get("/notification");
  return res.data.data;
};

export const markNotificationRead = async (id) => {
  const res = await api.put(`/notification/${id}/read`);
  return res.data.data;
};