import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";

import { connectDB } from "./config/db.js";
import { connectProducer } from "./kafka/producer.js";
import { createTopicsIfNotExists } from "./kafka/admin.js";
import { initConsumer } from "./kafka/consumer.js";

const PORT = process.env.PORT || 5004;

const start = async () => {
  try {
    console.log("1");
    await connectDB();

    console.log("2");
    await connectProducer();

    console.log("3");
    await createTopicsIfNotExists();

    console.log("4");
    await initConsumer();

    console.log("5");
    app.listen(PORT, () => {
      console.log(`🚀 Shipment Service running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();