import { useState } from "react";
import { createProduct } from "../../services/productService";

function CreateProductModal({
  open,
  onClose,
  onProductCreated,
}) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    productId: "",
    name: "",
    photoUrl: "",
    category: "",
    size: "",
    weight: "",
    totalStock: 0,
    lowStockThreshold: 100,
  });

  if (!open) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await createProduct({
        ...formData,
        totalStock: Number(formData.totalStock),
        lowStockThreshold: Number(
          formData.lowStockThreshold
        ),
      });

      await onProductCreated();

      onClose();

      setFormData({
        productId: "",
        name: "",
        photoUrl: "",
        category: "",
        size: "",
        weight: "",
        totalStock: 0,
        lowStockThreshold: 100,
      });
    } catch (err) {
      console.error(err);
      alert("Unable to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-5">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl">

        <div className="border-b p-6 flex justify-between">

          <h2 className="text-2xl font-bold">
            Create Product
          </h2>

          <button
            onClick={onClose}
            className="text-3xl"
          >
            ×
          </button>

        </div>

        <div className="p-6 grid grid-cols-2 gap-5">

          <input
            placeholder="Product ID"
            className="border p-3 rounded-lg"
            value={formData.productId}
            onChange={(e)=>
              handleChange(
                "productId",
                e.target.value
              )
            }
          />

          <input
            placeholder="Product Name"
            className="border p-3 rounded-lg"
            value={formData.name}
            onChange={(e)=>
              handleChange(
                "name",
                e.target.value
              )
            }
          />

          <input
            placeholder="Category"
            className="border p-3 rounded-lg"
            value={formData.category}
            onChange={(e)=>
              handleChange(
                "category",
                e.target.value
              )
            }
          />

          <input
            placeholder="Size"
            className="border p-3 rounded-lg"
            value={formData.size}
            onChange={(e)=>
              handleChange(
                "size",
                e.target.value
              )
            }
          />

          <input
            placeholder="Weight"
            className="border p-3 rounded-lg"
            value={formData.weight}
            onChange={(e)=>
              handleChange(
                "weight",
                e.target.value
              )
            }
          />

          <input
            placeholder="Photo URL"
            className="border p-3 rounded-lg"
            value={formData.photoUrl}
            onChange={(e)=>
              handleChange(
                "photoUrl",
                e.target.value
              )
            }
          />

          <input
            type="number"
            placeholder="Initial Stock"
            className="border p-3 rounded-lg"
            value={formData.totalStock}
            onChange={(e)=>
              handleChange(
                "totalStock",
                e.target.value
              )
            }
          />

          <input
            type="number"
            placeholder="Low Stock Threshold"
            className="border p-3 rounded-lg"
            value={formData.lowStockThreshold}
            onChange={(e)=>
              handleChange(
                "lowStockThreshold",
                e.target.value
              )
            }
          />

        </div>

        <div className="border-t p-5 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="border px-5 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={handleSubmit}
            className="bg-green-600 text-white px-5 py-2 rounded-lg"
          >
            {loading
              ? "Creating..."
              : "Create Product"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default CreateProductModal;