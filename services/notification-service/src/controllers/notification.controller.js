import * as repo from "../repositories/notification.repository.js";

export const getAllNotifications = async (req, res) => {
  try {
    const data = await repo.getAllNotifications();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const markRead = async (req, res) => {
  try {
    const data = await repo.markAsRead(req.params.id);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};