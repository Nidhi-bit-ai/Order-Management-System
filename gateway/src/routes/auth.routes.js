import express from "express";
import { SERVICES } from "../config/services.js";
import { forwardRequest } from "../utils/httpClient.js";

const router = express.Router();

// Register
router.post("/auth/register", async (req, res) => {
  try {
    const response = await forwardRequest(
      `${SERVICES.AUTH}/api/auth/register`,
      req
    );

    return res.status(response.status).json(response.data);
  } catch (err) {
    console.error("Gateway Register Error:", err.message);

    return res.status(500).json({
      success: false,
      message: "Unable to connect to Auth Service",
    });
  }
});

// Login
router.post("/auth/login", async (req, res) => {
  try {
    const response = await forwardRequest(
      `${SERVICES.AUTH}/api/auth/login`,
      req
    );

    return res.status(response.status).json(response.data);
  } catch (err) {
    console.error("Gateway Login Error:", err.message);

    return res.status(500).json({
      success: false,
      message: "Unable to connect to Auth Service",
    });
  }
});

// Change Password
router.put("/auth/change-password", async (req, res) => {
  try {
    const response = await forwardRequest(
      `${SERVICES.AUTH}/api/auth/change-password`,
      req
    );

    return res.status(response.status).json(response.data);
  } catch (err) {
    console.error("Gateway Change Password Error:", err.message);

    return res.status(500).json({
      success: false,
      message: "Unable to connect to Auth Service",
    });
  }
});

export default router;