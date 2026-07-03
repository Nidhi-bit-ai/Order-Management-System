import { kafka } from "../config/kafka.js";

/**
 * =========================
 * CREATE KAFKA TOPICS
 * =========================
 */
export const createTopicsIfNotExists = async () => {
  const admin = kafka.admin();

  await admin.connect();

  console.log("🛠️ Kafka Admin connected");

  const topics = [
    "shipment.created",
    "shipment.packaged",
    "shipment.picked_up",
    "shipment.at_origin_hub",
    "shipment.in_transit",
    "shipment.at_destination_hub",
    "shipment.out_for_delivery",
    "shipment.delivered",
    "shipment.cancelled",
  ];

  const existingTopics = await admin.listTopics();

  const topicsToCreate = topics.filter(
    (topic) => !existingTopics.includes(topic)
  );

  if (topicsToCreate.length > 0) {
    await admin.createTopics({
      topics: topicsToCreate.map((topic) => ({
        topic,
        numPartitions: 1,
        replicationFactor: 1,
      })),
    });

    console.log(
      `📦 Created topics: ${topicsToCreate.join(", ")}`
    );
  } else {
    console.log("📦 Shipment topics already exist");
  }

  await admin.disconnect();
};