import { useEffect, useState } from "react";
import { updateProduct } from "../../services/productService";

function EditProductModal({
  open,
  onClose,
  product,
  onProductUpdated,
}) {
  const [formData, setFormData] = useState({
    name: "",
    photoUrl: "",
    category: "",
    size: "",
    weight: "",
    lowStockThreshold: 100,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        photoUrl: product.photoUrl || "",
        category: product.category || "",
        size: product.size || "",
        weight: product.weight || "",
        lowStockThreshold:
          product.lowStockThreshold || 100,
      });
    }
  }, [product]);

  if (!open || !product) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      await updateProduct(
        product.productId,
        formData
      );

      await onProductUpdated();

      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-5">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl">

        {/* Header */}

        <div className="border-b p-6 flex justify-between items-center">

          <div>

            <h2 className="text-2xl font-bold">
              Edit Product
            </h2>

            <p className="text-gray-500">
              {product.productId}
            </p>

          </div>

          <button
            onClick={onClose}
            className="text-3xl text-gray-500 hover:text-red-600"
          >
            ×
          </button>

        </div>

        {/* Body */}

        <div className="p-6 grid grid-cols-2 gap-5">

          <div className="col-span-2">

            <label className="font-medium">
              Product Name
            </label>

            <input
              className="border rounded-lg p-3 w-full mt-1"
              value={formData.name}
              onChange={(e) =>
                handleChange("name", e.target.value)
              }
            />

          </div>

          <div className="col-span-2">

            <label className="font-medium">
              Photo URL
            </label>

            <input
              className="border rounded-lg p-3 w-full mt-1"
              value={formData.photoUrl}
              onChange={(e) =>
                handleChange(
                  "photoUrl",
                  e.target.value
                )
              }
            />

          </div>

          <div>

            <label className="font-medium">
              Category
            </label>

            <input
              className="border rounded-lg p-3 w-full mt-1"
              value={formData.category}
              onChange={(e) =>
                handleChange(
                  "category",
                  e.target.value
                )
              }
            />

          </div>

          <div>

            <label className="font-medium">
              Size
            </label>

            <input
              className="border rounded-lg p-3 w-full mt-1"
              value={formData.size}
              onChange={(e) =>
                handleChange("size", e.target.value)
              }
            />

          </div>

          <div>

            <label className="font-medium">
              Weight
            </label>

            <input
              className="border rounded-lg p-3 w-full mt-1"
              value={formData.weight}
              onChange={(e) =>
                handleChange(
                  "weight",
                  e.target.value
                )
              }
            />

          </div>

          <div>

            <label className="font-medium">
              Low Stock Threshold
            </label>

            <input
              type="number"
              className="border rounded-lg p-3 w-full mt-1"
              value={formData.lowStockThreshold}
              onChange={(e) =>
                handleChange(
                  "lowStockThreshold",
                  Number(e.target.value)
                )
              }
            />

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
            disabled={loading}
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-5 py-2 rounded-lg"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default EditProductModal;