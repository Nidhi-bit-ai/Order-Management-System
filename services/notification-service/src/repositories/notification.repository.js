import { Notification } from "../models/notification.model.js";

export const createNotification = async (data) => {
  return await Notification.create(data);
};

export const getAllNotifications = async (filter = {}) => {
  return await Notification.find(filter).sort({ createdAt: -1 });
};

export const markAsRead = async (id) => {
  return await Notification.findOneAndUpdate(
    { notificationId: id },
    { read: true },
    { new: true }
  );
};