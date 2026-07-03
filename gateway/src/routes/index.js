import express from "express";

import authRoutes from "./auth.routes.js";
import orderRoutes from "./order.routes.js";
import inventoryRoutes from "./inventory.routes.js";
import shipmentRoutes from "./shipment.routes.js";
import notificationRoutes from "./notification.routes.js";
import syncRoutes from "./sync.routes.js";

const router = express.Router();

router.use(authRoutes);
router.use("/orders", orderRoutes);
router.use("/inventory", inventoryRoutes);
router.use("/shipment", shipmentRoutes);
router.use("/notification", notificationRoutes);
router.use("/sync", syncRoutes);

export default router;