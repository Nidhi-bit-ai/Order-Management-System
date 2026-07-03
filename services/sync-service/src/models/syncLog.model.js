import mongoose from "mongoose";

const syncLogSchema = new mongoose.Schema(
  {
    // External website order id
    externalOrderId: {
      type: String,
      required: true,
      index: true,
    },

    // OMS generated order id
    omsOrderId: {
      type: String,
      index: true,
    },

    // Current sync stage
    status: {
      type: String,
      enum: [
        "RECEIVED",
        "VALIDATED",
        "PUBLISHED",
        "FAILED",
        "DUPLICATE",
      ],
      default: "RECEIVED",
      index: true,
    },

    // Original payload received from external system
    payload: {
      type: Object,
      required: true,
    },

    // Failure reason (if any)
    reason: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Useful indexes
syncLogSchema.index({ externalOrderId: 1 });
syncLogSchema.index({ omsOrderId: 1 });
syncLogSchema.index({ status: 1 });
syncLogSchema.index({ createdAt: -1 });

export const SyncLog = mongoose.model("SyncLog", syncLogSchema);