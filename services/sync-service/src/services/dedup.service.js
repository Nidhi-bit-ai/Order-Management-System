import { SyncLog } from "../models/syncLog.model.js";

export const isDuplicate = async (externalOrderId) => {
  const order = await SyncLog.findOne({
    externalOrderId,
  });

  return !!order;
};