import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT || 5003,
  NODE_ENV: process.env.NODE_ENV || "development",

  MONGO_URI: process.env.MONGO_URI,

  KAFKA: {
    CLIENT_ID: process.env.KAFKA_CLIENT_ID,
    BROKER: process.env.KAFKA_BROKER?.split(",") || ["localhost:9092"],
    GROUP_ID: process.env.KAFKA_GROUP_ID,
  },

  LOG_LEVEL: process.env.LOG_LEVEL || "info",
};