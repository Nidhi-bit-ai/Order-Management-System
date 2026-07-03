import express from "express";
import { ingestController } from "../controllers/ingest.controller.js";

const router = express.Router();

router.post("/order", ingestController);

export default router;