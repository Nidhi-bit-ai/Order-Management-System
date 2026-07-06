import {ingestOrder,getSyncLogs,} from "../services/ingest.service.js";

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

export const getSyncLogsController = async (req, res) => {
  try {
    const logs = await getSyncLogs();

    res.json({
      success: true,
      data: logs,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};