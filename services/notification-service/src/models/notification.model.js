import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    notificationId: {
      type: String,
      required: true,
      unique: true,
    },

    type: {
      type: String,
      enum: ["ORDER", "SHIPMENT", "INVENTORY"],
      required: true,
    },

    recipientType: {
      type: String,
      enum: ["CUSTOMER", "ADMIN"],
      required: true,
    },

    customerId: String,
    orderId: String,
    trackingId: String,

    title: String,
    message: String,

    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Notification = mongoose.model(
  "Notification",
  notificationSchema
);