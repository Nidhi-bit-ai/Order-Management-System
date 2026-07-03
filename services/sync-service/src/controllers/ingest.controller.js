import { ingestOrder } from "../services/ingest.service.js";

export const ingestController = async (req, res) => {
  try {
    const result = await ingestOrder(req.body);

    res.json({
      success: true,
      result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};