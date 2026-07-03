import mongoose from "mongoose";

/**
 * =========================
 * SHIPMENT ITEM
 * =========================
 */
const shipmentItemSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
    },

    name: String,

    quantity: {
      type: Number,
      required: true,
    },

    price: Number,
  },
  { _id: false }
);

/**
 * =========================
 * ROUTE
 * =========================
 */
const routeSchema = new mongoose.Schema(
  {
    hub: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

/**
 * =========================
 * TRACKING HISTORY
 * =========================
 */
const trackingSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
    },

    hub: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

/**
 * =========================
 * SHIPMENT SCHEMA
 * =========================
 */
const shipmentSchema = new mongoose.Schema(
  {
    shipmentId: {
      type: String,
      required: true,
      unique: true,
    },

    trackingId: {
      type: String,
      required: true,
      unique: true,
    },

    orderId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    customerId: {
      type: String,
      required: true,
    },

    items: [shipmentItemSchema],

    shippingAddress: {
      name: String,
      phone: String,
      address: String,
      city: String,
      state: String,
      pincode: String,
    },

    status: {
      type: String,
      enum: [
        "CREATED",
        "PACKAGED",
        "PICKED_UP",
        "AT_HUB",
        "IN_TRANSIT",
        "OUT_FOR_DELIVERY",
        "DELIVERED",
        "CANCELLED",
      ],
      default: "CREATED",
      index: true,
    },

    /**
     * Complete planned route
     */
    route: [routeSchema],

    /**
     * Current position in route
     */
    routeIndex: {
      type: Number,
      default: 0,
    },

    /**
     * Current hub
     */
    currentHub: {
      type: String,
      default: "Warehouse",
    },

    /**
     * Tracking timeline
     */
    trackingHistory: [trackingSchema],
  },
  {
    timestamps: true,
  }
);

/**
 * =========================
 * ADDITIONAL INDEXES
 * =========================
 */

shipmentSchema.index({ status: 1 });

export const Shipment = mongoose.model(
  "Shipment",
  shipmentSchema
);