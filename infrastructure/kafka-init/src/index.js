import { Kafka } from "kafkajs";
import { topics } from "./topics.js";

const kafka = new Kafka({
  clientId: "kafka-init",
  brokers: [process.env.KAFKA_BROKER || "kafka:9092"],
});

const MAX_RETRIES = 15;
const RETRY_DELAY = 3000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function connectAdmin() {
  const admin = kafka.admin();

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(
        `🔄 Connecting to Kafka (Attempt ${attempt}/${MAX_RETRIES})...`
      );

      await admin.connect();

      console.log("✅ Connected to Kafka");
      return admin;
    } catch (error) {
      console.error(
        `❌ Kafka connection failed: ${error.message}`
      );

      if (attempt === MAX_RETRIES) {
        throw error;
      }

      console.log(`⏳ Retrying in ${RETRY_DELAY / 1000} seconds...\n`);
      await sleep(RETRY_DELAY);
    }
  }
}

async function createTopics() {
  const admin = await connectAdmin();

  try {
    const existingTopics = await admin.listTopics();

    const missingTopics = topics.filter(
      (topic) => !existingTopics.includes(topic)
    );

    if (missingTopics.length === 0) {
      console.log("📦 All Kafka topics already exist.");
      return;
    }

    await admin.createTopics({
      topics: missingTopics.map((topic) => ({
        topic,
        numPartitions: 1,
        replicationFactor: 1,
      })),
    });

    console.log("✅ Created topics:");
    missingTopics.forEach((topic) => console.log(`   • ${topic}`));
  } finally {
    await admin.disconnect();
    console.log("🔌 Kafka Admin disconnected");
  }
}

(async () => {
  try {
    await createTopics();

    console.log("🎉 Kafka initialization completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Kafka initialization failed.");
    console.error(error);

    process.exit(1);
  }
})();