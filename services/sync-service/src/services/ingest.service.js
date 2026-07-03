import { SyncLog } from "../models/syncLog.model.js";
import { isDuplicate } from "./dedup.service.js";
import { transformOrder } from "./transformer.service.js";
import { publishToOrderService } from "./order.publisher.js";

export const ingestOrder = async (externalOrder) => {
  const externalOrderId = externalOrder.id;


    // 1. Check duplicate first
    const duplicate = await isDuplicate(externalOrderId);

    if (duplicate) {
        await SyncLog.updateOne(
            { externalOrderId },
            { status: "DUPLICATE" }
        );

        return {
            skipped: true,
            reason: "Duplicate order"
        };
    }

    // 2. Now create the sync log
    const log = await SyncLog.create({
        externalOrderId,
        status: "RECEIVED",
        payload: externalOrder,
    });

  try {
    // 3. transform
    const order = transformOrder(externalOrder);

    log.status = "VALIDATED";
    await log.save();

    // 4. Forward to Order Service
    const response = await publishToOrderService(order);

    log.omsOrderId = response.orderId;

    log.status = "PUBLISHED";

    await log.save();

    return {
        success: true,
        omsOrderId: response.orderId,
    };
  } catch (err) {
        console.error("SYNC ERROR");
        console.error(err);

        if (err.response) {
            console.error("Status:", err.response.status);
            console.error("Body:", err.response.data);
        }

        log.status = "FAILED";
        log.reason = err.message;

        await log.save();

        throw err;
    }
};