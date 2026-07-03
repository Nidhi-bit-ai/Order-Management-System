import express from "express";

import authRoutes from "./auth.routes.js";
import orderRoutes from "./order.routes.js";
import inventoryRoutes from "./inventory.routes.js";
import shipmentRoutes from "./shipment.routes.js";
import notificationRoutes from "./notification.routes.js";
import syncRoutes from "./sync.routes.js";

const router = express.Router();

router.use(authRoutes);
router.use(orderRoutes);
router.use(inventoryRoutes);
router.use(shipmentRoutes);
router.use( notificationRoutes);
router.use(syncRoutes);

export default router;