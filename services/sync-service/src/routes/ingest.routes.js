import express from "express";

import {
  ingestController,
  getSyncLogsController,
} from "../controllers/ingest.controller.js";

const router = express.Router();

router.post("/order", ingestController);

router.get("/logs", getSyncLogsController);

export default router;