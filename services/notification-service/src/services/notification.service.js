import { v4 as uuidv4 } from "uuid";
// import { randomUUID } from "crypto";
// const id = randomUUID();
import * as repo from "../repositories/notification.repository.js";

export const createNotification = async ({
  type,
  recipientType,
  customerId,
  orderId,
  trackingId,
  title,
  message,
}) => {
  return await repo.createNotification({
    notificationId: uuidv4(),
    type,
    recipientType,
    customerId,
    orderId,
    trackingId,
    title,
    message,
  });
};