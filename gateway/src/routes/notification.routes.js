import express from "express";
import { SERVICES } from "../config/services.js";
import { forwardRequest } from "../utils/httpClient.js";

const router = express.Router();

router.use(async (req, res) => {
  try {
    const response = await forwardRequest(
      `${SERVICES.NOTIFICATION}/api/v1/notification${req.url}`,
      req
    );
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data);
  }
});

export default router;