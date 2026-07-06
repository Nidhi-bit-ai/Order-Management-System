import mongoose from "mongoose";

/**
 * =========================
 * ORDER ITEM STRUCTURE
 * =========================
 * Each product inside an order
 */
const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

/**
 * =========================
 * MAIN ORDER SCHEMA
 * =========================
 */
const orderSchema = new mongoose.Schema(
  {
    // Unique order identifier (human readable)
    orderId: {
      type: String,
      required: true,
      unique: true,
    },

    // External order id received from external website
    externalOrderId: {
        type: String,
        default: undefined,
    },
    // Customer details coming from Sync Service / external system
    customerId: {
      type: String,
      required: true,
      index: true,
    },

    // List of items in the order
    items: [orderItemSchema],

    // Total cost calculations
    subtotal: {
      type: Number,
      required: true,
    },

    tax: {
      type: Number,
      default: 0,
    },

    shippingCost: {
      type: Number,
      default: 0,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    // Current lifecycle status of order
    status: {
        type: String,
        enum: [
            "CREATED",
            "CONFIRMED",
            "PROCESSING",
            "PACKAGED",
            "PICKED_UP",
            "AT_ORIGIN_HUB",
            "IN_TRANSIT",
            "AT_DESTINATION_HUB",
            "OUT_FOR_DELIVERY",
            "DELIVERED",
            "CANCELLED",
            "FAILED",
        ],
        default: "CREATED",
        index: true,
        },
    // Payment status is optional (since no payment service)
    paymentStatus: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED"],
      default: "PENDING",
    },

    // Shipping address snapshot (important: do not depend on external DB later)
    shippingAddress: {
      name: String,
      phone: String,
      address: String,
      city: String,
      state: String,
      pincode: String,
    },

    // Source of order (important for Sync Service tracking)
    source: {
      type: String,
      enum: ["SYNC", "MANUAL","ADMIN"],
      default: "SYNC",
    },
  },
  {
    timestamps: true, // automatically adds createdAt & updatedAt
  }
);

/**
 * =========================
 * INDEXES (Performance Optimization)
 * =========================
 */
orderSchema.index({ orderId: 1 });
orderSchema.index({ customerId: 1, createdAt: -1 });
orderSchema.index({ status: 1 });
orderSchema.index(
  { externalOrderId: 1 },
  {
    unique: true,
    partialFilterExpression: {
      externalOrderId: { $exists: true }
    }
  }
);
/**
 * =========================
 * EXPORT MODEL
 * =========================
 */
export const Order = mongoose.model("Order", orderSchema);