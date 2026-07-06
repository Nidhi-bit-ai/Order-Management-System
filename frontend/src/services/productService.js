import api from "./api";

// Get all products
export const getProducts = async () => {
  const response = await api.get("/inventory");
  return response.data.data;
};

// Get single product
export const getProduct = async (productId) => {
  const response = await api.get(`/inventory/${productId}`);
  return response.data.data;
};

// Create product
export const createProduct = async (productData) => {
  const response = await api.post("/inventory", productData);
  return response.data.data;
};

// Update product
export const updateProduct = async (productId, productData) => {
  const response = await api.put(
    `/inventory/${productId}`,
    productData
  );

  return response.data.data;
};

// Delete product
export const deleteProduct = async (productId) => {
  const response = await api.delete(
    `/inventory/${productId}`
  );

  return response.data;
};

// Restock
export const restockProduct = async (
  productId,
  quantity
) => {
  const response = await api.put(
    `/inventory/${productId}/restock`,
    {
      quantity,
    }
  );

  return response.data.data;
};

// Check stock
export const checkStock = async (
  productId,
  quantity
) => {
  const response = await api.get(
    `/inventory/${productId}/check`,
    {
      params: {
        qty: quantity,
      },
    }
  );

  return response.data.data;
};

// Inventory Stats
export const getInventoryStats = async () => {
  const response = await api.get(
    "/inventory/stats"
  );

  return response.data.data;
};