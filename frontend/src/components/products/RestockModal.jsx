import { useState } from "react";
import { restockProduct } from "../../services/productService";

function RestockModal({
  open,
  product,
  onClose,
  onProductUpdated,
}) {
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open || !product) return null;

  const available =
    product.totalStock - product.reservedStock;

  const handleRestock = async () => {
    if (!quantity || Number(quantity) <= 0) {
      alert("Enter a valid quantity");
      return;
    }

    try {
      setLoading(true);

      await restockProduct(
        product.productId,
        Number(quantity)
      );

      await onProductUpdated();

      setQuantity("");

      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to restock product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">

        {/* Header */}
        <div className="border-b p-5">

          <h2 className="text-2xl font-bold">
            Restock Product
          </h2>

          <p className="text-gray-500 mt-1">
            {product.name}
          </p>

        </div>

        {/* Body */}
        <div className="p-5 space-y-4">

          <div>

            <p className="text-gray-500">
              Total Stock
            </p>

            <p className="font-semibold">
              {product.totalStock}
            </p>

          </div>

          <div>

            <p className="text-gray-500">
              Reserved Stock
            </p>

            <p className="font-semibold">
              {product.reservedStock}
            </p>

          </div>

          <div>

            <p className="text-gray-500">
              Available Stock
            </p>

            <p className="font-semibold">
              {available}
            </p>

          </div>

          <div>

            <label className="font-medium">
              Quantity to Add
            </label>

            <input
              type="number"
              className="border rounded-lg p-3 w-full mt-2"
              value={quantity}
              onChange={(e) =>
                setQuantity(e.target.value)
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
            onClick={handleRestock}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-5 py-2 rounded-lg"
          >
            {loading
              ? "Updating..."
              : "Restock"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default RestockModal;