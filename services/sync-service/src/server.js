import dotenv from "dotenv";
dotenv.config();
console.log("ORDER_SERVICE_URL =", process.env.ORDER_SERVICE_URL);

import app from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 5006;

const start = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Sync Service running on ${PORT}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();