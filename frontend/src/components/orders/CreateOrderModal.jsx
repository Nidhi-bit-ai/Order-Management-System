import Select from "react-select";
import { useState, useEffect } from "react";
import { createOrder } from "../../services/orderService";
import { getProducts } from "../../services/productService";

function CreateOrderModal({ open, onClose, onOrderCreated }) {
  const initialState = {
    customerId: "",

    shippingAddress: {
      name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    },

    items: [
      {
        productId: "",
        name: "",
        quantity: 1,
        price: "",
      },
    ],
  };

  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (!open) return;

    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error("Failed to load products", err);
      }
    };

    fetchProducts();
  }, [open]);

  const addItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        {
          productId: "",
          name: "",
          quantity: 1,
          price: "",
        },
      ],
    });
  };

  const removeItem = (index) => {
    if (formData.items.length === 1) return;

    const updated = [...formData.items];
    updated.splice(index, 1);

    setFormData({
      ...formData,
      items: updated,
    });
  };

  const updateItem = (index, field, value) => {
    const updated = [...formData.items];
    updated[index][field] = value;

    setFormData({
      ...formData,
      items: updated,
    });
  };

  const clearProduct = (index) => {
    const updatedItems = [...formData.items];

    updatedItems[index] = {
      productId: "",
      name: "",
      quantity: "",
      price: "",
    };

    setFormData({
      ...formData,
      items: updatedItems,
    });
  };

  const handleCreateOrder = async () => {
    try {
      setLoading(true);

      // Basic validation
      if (!formData.customerId.trim()) {
        alert("Customer ID is required");
        return;
      }

      if (formData.items.length === 0) {
        alert("Add at least one product");
        return;
      }

      for (const item of formData.items) {
        if (
          !item.productId ||
          !item.name ||
          item.quantity <= 0 ||
          item.price <= 0
        ) {
          alert("Please fill all product details correctly");
          return;
        }

        // Check available stock
        const product = products.find(
          (p) => p.productId === item.productId
        );

        if (!product) {
          alert(`Product ${item.productId} not found.`);
          return;
        }

        const availableStock =
          product.totalStock - product.reservedStock;

        if (item.quantity > availableStock) {
          alert(
            `${product.name} has only ${availableStock} units available.`
          );
          return;
        }
      }

      // Create order
      await createOrder(formData);

      alert("Order created successfully!");

      // Refresh orders table
      if (onOrderCreated) {
        await onOrderCreated();
      }

      // Reset form
      setFormData(initialState);

      // Close modal
      onClose();

    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
        "Failed to create order."
      );

    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-5">

      <div className="bg-white w-full max-w-5xl rounded-xl shadow-xl max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="flex justify-between items-center border-b p-6">

          <h2 className="text-2xl font-bold">
            Create Order
          </h2>

          <button
            onClick={onClose}
            className="text-3xl text-gray-500 hover:text-red-600"
          >
            ×
          </button>

        </div>

        {/* Body */}
        <div className="overflow-y-auto p-6">

          {/* Customer */}
          <div className="mb-8">

            <h3 className="text-lg font-semibold mb-3">
              Customer Information
            </h3>

            <input
              type="text"
              placeholder="Customer ID"
              value={formData.customerId}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  customerId: e.target.value,
                })
              }
              className="w-full border rounded-lg p-3"
            />

          </div>

          {/* Shipping */}
          <div className="mb-8">

            <h3 className="text-lg font-semibold mb-3">
              Shipping Address
            </h3>

            <div className="grid grid-cols-2 gap-4">

              <input
                placeholder="Name"
                className="border rounded-lg p-3"
                value={formData.shippingAddress.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    shippingAddress: {
                      ...formData.shippingAddress,
                      name: e.target.value,
                    },
                  })
                }
              />

              <input
                placeholder="Phone"
                className="border rounded-lg p-3"
                value={formData.shippingAddress.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    shippingAddress: {
                      ...formData.shippingAddress,
                      phone: e.target.value,
                    },
                  })
                }
              />

              <input
                placeholder="Address"
                className="border rounded-lg p-3 col-span-2"
                value={formData.shippingAddress.address}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    shippingAddress: {
                      ...formData.shippingAddress,
                      address: e.target.value,
                    },
                  })
                }
              />

              <input
                placeholder="City"
                className="border rounded-lg p-3"
                value={formData.shippingAddress.city}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    shippingAddress: {
                      ...formData.shippingAddress,
                      city: e.target.value,
                    },
                  })
                }
              />

              <input
                placeholder="State"
                className="border rounded-lg p-3"
                value={formData.shippingAddress.state}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    shippingAddress: {
                      ...formData.shippingAddress,
                      state: e.target.value,
                    },
                  })
                }
              />

              <input
                placeholder="Pincode"
                className="border rounded-lg p-3"
                value={formData.shippingAddress.pincode}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    shippingAddress: {
                      ...formData.shippingAddress,
                      pincode: e.target.value,
                    },
                  })
                }
              />

            </div>

          </div>

          {/* Products */}
          <div className="mb-8">

            <div className="flex justify-between items-center mb-4">

              <h3 className="text-lg font-semibold">
                Products
              </h3>

              <button
                type="button"
                onClick={addItem}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                + Add Product
              </button>

            </div>

            {formData.items.map((item, index) => (

              <div
                key={index}
                className="border rounded-lg p-4 mb-4"
              >

                <div className="flex justify-between items-center mb-4">

                  <h4 className="font-semibold">
                    Product {index + 1}
                  </h4>

                  {formData.items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="text-red-600"
                    >
                      Remove
                    </button>
                  )}

                </div>

                <div className="grid grid-cols-2 gap-4">

                  <div className="relative">
                    <Select
                      options={products.map((product) => ({
                        value: product.productId,
                        label: `${product.productId} - ${product.name}`,
                        product,
                      }))}

                      value={
                        item.productId
                          ? {
                              value: item.productId,
                              label: `${item.productId} - ${item.name}`,
                            }
                          : null
                      }

                      onChange={(selected) => {
                        const updated = [...formData.items];

                        if (!selected) {
                          // User cleared the selection
                          updated[index] = {
                            productId: "",
                            name: "",
                            quantity: "",
                            price: "",
                          };
                        } else {
                          const product = selected.product;

                          updated[index] = {
                            ...updated[index],
                            productId: product.productId,
                            name: product.name,
                            quantity: "",
                            // Keep existing price or set a default if desired
                            price: updated[index].price,
                          };
                        }

                        setFormData({
                          ...formData,
                          items: updated,
                        });
                      }}

                      placeholder="Search Product..."
                      isSearchable
                      isClearable
                      backspaceRemovesValue
                    />
                  </div>

                  <input
                    placeholder="Product Name"
                    className="border rounded-lg p-3 bg-gray-100"
                    value={item.name}
                    readOnly
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Available Stock
                    </label>

                    <input
                      type="text"
                      readOnly
                      value={
                        products.find((p) => p.productId === item.productId)
                          ? products.find((p) => p.productId === item.productId).totalStock -
                            products.find((p) => p.productId === item.productId).reservedStock
                          : ""
                      }
                      className="w-full border rounded-lg p-3 bg-gray-100 text-gray-700 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity
                    </label>

                    <input
                      type="number"
                      min="1"
                      step="1"
                      placeholder="Quantity"
                      className="w-full border rounded-lg p-3"
                      value={item.quantity || ""}
                      onChange={(e) =>
                        updateItem(
                          index,
                          "quantity",
                          e.target.value === "" ? "" : Number(e.target.value)
                        )
                      }
                    />
                  </div>

                  <input
                    type="number"
                    placeholder="Price"
                    className="border rounded-lg p-3"
                    value={item.price}
                    onChange={(e) =>
                      updateItem(index, "price", Number(e.target.value))
                    }
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Footer */}
        <div className="border-t p-5 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="border px-5 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleCreateOrder}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg disabled:bg-gray-400"
            >
            {loading ? "Creating..." : "Create Order"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default CreateOrderModal;