import mongoose from "mongoose";

/**
 * =========================
 * INVENTORY MODEL
 * =========================
 * Stores product + stock + metadata
 */

const inventorySchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    name: String,
    photoUrl: String,
    size: String,
    weight: String,
    category: String,

    totalStock: {
      type: Number,
      required: true,
      default: 0,
    },

    reservedStock: {
      type: Number,
      default: 0,
    },

    lowStockThreshold: {
      type: Number,
      default: 100,
    },
  },
  { timestamps: true }
);

/**
 * Virtual field → available stock
 */
inventorySchema.virtual("availableStock").get(function () {
  return this.totalStock - this.reservedStock;
});

export const Inventory = mongoose.model("Inventory", inventorySchema);