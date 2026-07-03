import {
  createProduct,
  getAllProducts,
  checkStock,
  reserveStock,
  releaseStock,
  restock,
  getProduct,
  updateProduct,
  deleteProduct,
  getInventoryStats,
} from "../services/inventory.service.js";
/**
 * =========================
 * CREATE PRODUCT
 * =========================
 */
export const createProductController = async (req, res, next) => {
  try {
    const product = await createProduct(req.body);

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * =========================
 * CHECK STOCK
 * =========================
 */
export const checkStockController = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const qty = Number(req.query.qty);

    const result = await checkStock(productId, qty);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * =========================
 * RESTOCK PRODUCT
 * =========================
 */
export const restockController = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    const product = await restock(productId, quantity);

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * =========================
 * RESERVE STOCK
 * =========================
 */
export const reserveStockController = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    const success = await reserveStock(productId, quantity);

    res.json({
      success,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * =========================
 * RELEASE STOCK
 * =========================
 */
export const releaseStockController = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    await releaseStock(productId, quantity);

    res.json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * =========================
 * GET ALL PRODUCTS
 * =========================
 */
export const getAllProductsController = async (req, res, next) => {
  try {
    const products = await getAllProducts();

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * =========================
 * GET PRODUCT BY ID
 * =========================
 */
export const getProductController = async (req, res) => {
  try {
    const product = await getProduct(req.params.productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      data: product,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


/**
 * =========================
 * UPDATE PRODUCT BY ID
 * ========================
 * */
export const updateProductController = async (req, res) => {
  try {
    const product = await updateProduct(
      req.params.productId,
      req.body
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      data: product,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


/**
 * =========================
 * DELETE PRODUCT BY ID
 * ========================
 * */
export const deleteProductController = async (req, res) => {
  try {
    const product = await deleteProduct(req.params.productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


/**
 * =========================
 * GET INVENTORY STATS
 * ========================
 * */
export const getInventoryStatsController = async (req, res) => {
  try {
    const stats = await getInventoryStats();

    res.json({
      success: true,
      data: stats,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
