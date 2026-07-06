import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import {
  register,
  login,
  changePassword,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.put(
  "/change-password",
  authMiddleware,
  changePassword
);

export default router;