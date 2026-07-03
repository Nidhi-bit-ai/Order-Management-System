import { Inventory } from "../models/inventory.model.js";
import {
    emitLowStockEvent,
    emitInventoryReservedEvent,
    emitInventoryFailedEvent,
    emitInventoryReleasedEvent,
} from "../kafka/producer.js";
/**
 * =========================
 * UTIL: AVAILABLE STOCK
 * =========================
 */
const getAvailableStock = (product) => {
  return product.totalStock - product.reservedStock;
};

/**
 * =========================
 * CREATE PRODUCT
 * =========================
 */
export const createProduct = async (data) => {
  const exists = await Inventory.findOne({
    productId: data.productId,
  });

  if (exists) {
    throw new Error("Product already exists");
  }

  const product = await Inventory.create(data);

  return product;
};

/**
 * =========================
 * LOW STOCK CHECK UTIL
 * =========================
 */
export const checkLowStock = (product) => {
  const available = getAvailableStock(product);
  return available <= product.lowStockThreshold;
};

/**
 * =========================
 * CHECK STOCK (GATE API)
 * =========================
 */
export const checkStock = async (productId, qty) => {
  const product = await Inventory.findOne({ productId });

  if (!product) {
    return { available: false, reason: "Product not found" };
  }

  const availableStock = getAvailableStock(product);

  return {
    available: availableStock >= qty,
    availableStock,
  };
};

/**
 * =========================
 * RESERVE STOCK
 * =========================
 */
export const reserveStock = async (order) => {
  for (const item of order.items) {

    const product = await Inventory.findOne({
      productId: item.productId,
    });

    if (!product) {
      await emitInventoryFailedEvent(order, "PRODUCT_NOT_FOUND");
      return false;
    }

    const available = getAvailableStock(product);

    if (available < item.quantity) {
      await emitInventoryFailedEvent(order, "INSUFFICIENT_STOCK");
      return false;
    }

    product.reservedStock += item.quantity;

    await product.save();

    if (checkLowStock(product)) {
      await emitLowStockEvent(product);
    }
  }

  // Publish success only after ALL items are reserved
  await emitInventoryReservedEvent(order);

  return true;
};

/**
 * =========================
 * RELEASE STOCK
 * =========================
 */
export const releaseStock = async (order) => {

  for (const item of order.items) {

    const product = await Inventory.findOne({
      productId: item.productId,
    });

    if (!product) continue;

    product.reservedStock = Math.max(
      0,
      product.reservedStock - item.quantity
    );

    await product.save();
  }

  await emitInventoryReleasedEvent(order);

  return true;
};

/**
 * =========================
 * RESTOCK INVENTORY
 * =========================
 */
export const restock = async (productId, qty) => {
  const product = await Inventory.findOne({ productId });

  if (!product || qty <= 0) return null;

  product.totalStock += qty;
  await product.save();

  // 🔥 LOW STOCK CHECK
  if (checkLowStock(product)) {
    await emitLowStockEvent(product);
  }

  return product;
};

/**
 * =========================
 * GET ALL PRODUCTS
 * =========================
 */
export const getAllProducts = async () => {
  return await Inventory.find().sort({ createdAt: -1 });
};

/**
 * =========================
 * GET PRODUCT BY ID
 * =========================
 */
export const getProduct = async (productId) => {
  return await Inventory.findOne({ productId });
};

/**
 * =========================
 * update PRODUCT BY ID
 * =========================
 */
export const updateProduct = async (productId, data) => {
  return await Inventory.findOneAndUpdate(
    { productId },
    data,
    {
      new: true,
      runValidators: true,
    }
  );
};

/**
 * =========================
 * delete PRODUCT BY ID
 * =========================
 */
export const deleteProduct = async (productId) => {
  return await Inventory.findOneAndDelete({
    productId,
  });
};

/**
 * =========================
 * GET INVENTORY STATS
 * =========================
 */

export const getInventoryStats = async () => {
  const products = await Inventory.find();

  const totalProducts = products.length;

  let totalUnits = 0;
  let reservedUnits = 0;
  let lowStockProducts = 0;
  let outOfStockProducts = 0;

  products.forEach((product) => {
    totalUnits += product.totalStock;
    reservedUnits += product.reservedStock;

    const available =
      product.totalStock - product.reservedStock;

    if (available <= product.lowStockThreshold)
      lowStockProducts++;

    if (available <= 0)
      outOfStockProducts++;
  });

  return {
    products: totalProducts,
    totalUnits,
    reservedUnits,
    lowStockProducts,
    outOfStockProducts,
  };
};


