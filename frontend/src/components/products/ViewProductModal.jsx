function ViewProductModal({ product, onClose }) {
  if (!product) return null;

  const availableStock =
    product.totalStock - product.reservedStock;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-5">

      <div className="bg-white w-full max-w-4xl rounded-xl shadow-xl max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="border-b p-6 flex justify-between items-center">

          <div>
            <h2 className="text-2xl font-bold">
              Product Details
            </h2>

            <p className="text-gray-500 mt-1">
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
        <div className="p-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Product Image */}
            <div className="flex justify-center">

              <img
                src={product.photoUrl}
                alt={product.name}
                className="w-80 h-80 object-cover rounded-xl border"
              />

            </div>

            {/* Product Details */}
            <div className="space-y-4">

              <div>
                <p className="text-gray-500">Product Name</p>
                <p className="font-semibold text-lg">
                  {product.name}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Category</p>
                <p>{product.category}</p>
              </div>

              <div>
                <p className="text-gray-500">Size</p>
                <p>{product.size}</p>
              </div>

              <div>
                <p className="text-gray-500">Weight</p>
                <p>{product.weight}</p>
              </div>

              <div>
                <p className="text-gray-500">Total Stock</p>
                <p>{product.totalStock}</p>
              </div>

              <div>
                <p className="text-gray-500">Reserved Stock</p>
                <p>{product.reservedStock}</p>
              </div>

              <div>
                <p className="text-gray-500">Available Stock</p>

                <p className="font-semibold">
                  {availableStock}
                </p>
              </div>

              <div>
                <p className="text-gray-500">
                  Low Stock Threshold
                </p>

                <p>{product.lowStockThreshold}</p>
              </div>

            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="border-t p-5 flex justify-end">

          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}

export default ViewProductModal;