import mongoose from "mongoose";
import { env } from "./env.js";
import { logger } from "./logger.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);

    logger.info("✅ MongoDB connected successfully");
  } catch (error) {
    logger.error("❌ MongoDB connection failed:", error.message);

    process.exit(1);
  }
};