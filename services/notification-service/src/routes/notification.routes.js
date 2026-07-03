import express from "express";
import {
  getAllNotifications,
  markRead,
} from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/", getAllNotifications);
router.put("/:id/read", markRead);

export default router;