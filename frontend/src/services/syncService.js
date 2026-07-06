import api from "./api";

export const getSyncLogs = async () => {
  const res = await api.get("/sync/logs");
  return res.data.data;
};