import { useState } from "react";
import { deleteProduct } from "../../services/productService";

function DeleteProductModal({
  open,
  product,
  onClose,
  onDeleted,
}) {
  const [loading, setLoading] = useState(false);

  if (!open || !product) return null;

  const handleDelete = async () => {
    try {
      setLoading(true);

      await deleteProduct(product.productId);

      await onDeleted();

      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">

        {/* Header */}
        <div className="border-b p-5">
          <h2 className="text-2xl font-bold text-red-600">
            Delete Product
          </h2>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">

          <p>
            Are you sure you want to delete this product?
          </p>

          <div className="bg-gray-100 rounded-lg p-4">

            <p>
              <strong>ID:</strong> {product.productId}
            </p>

            <p>
              <strong>Name:</strong> {product.name}
            </p>

            <p>
              <strong>Category:</strong> {product.category}
            </p>

          </div>

          <p className="text-red-600 text-sm">
            This action cannot be undone.
          </p>

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
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-5 py-2 rounded-lg"
          >
            {loading
              ? "Deleting..."
              : "Delete Product"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteProductModal;