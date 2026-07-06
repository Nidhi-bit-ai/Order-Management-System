function ProductsTable({ products, onView, onEdit, onRestock, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <table className="w-full">

        <thead className="bg-gray-100">
          <tr>
            <th className="px-5 py-4 text-left">Image</th>
            <th className="px-5 py-4 text-left">Product</th>
            <th className="px-5 py-4 text-left">Category</th>
            <th className="px-5 py-4 text-center">Total</th>
            <th className="px-5 py-4 text-center">Reserved</th>
            <th className="px-5 py-4 text-center">Available</th>
            <th className="px-5 py-4 text-center">Status</th>
            <th className="px-5 py-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => {

            const available =
              (product.totalStock || 0) - (product.reservedStock || 0);

            const threshold = product.lowStockThreshold || 0;

            const isLowStock = available <= threshold;
            const isOutOfStock = available <= 0;

            return (
              <tr
                key={product.productId}
                className={`border-t hover:bg-gray-50 ${
                  isLowStock ? "bg-red-50" : ""
                }`}
              >

                {/* IMAGE */}
                <td className="px-5 py-4">
                  <img
                    src={
                      product.photoUrl ||
                      "https://placehold.co/100x100?text=No+Image"
                    }
                    alt={product.name}
                    className="w-16 h-16 rounded-lg object-cover border"
                  />
                </td>

                {/* PRODUCT INFO */}
                <td className="px-5 py-4">
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-gray-500 text-sm">
                    {product.productId}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {product.size || "-"}
                  </p>
                </td>

                {/* CATEGORY */}
                <td className="px-5 py-4">
                  {product.category || "-"}
                </td>

                {/* TOTAL */}
                <td className="text-center">
                  {product.totalStock || 0}
                </td>

                {/* RESERVED */}
                <td className="text-center">
                  {product.reservedStock || 0}
                </td>

                {/* AVAILABLE + PROGRESS BAR (STEP 7.1) */}
                <td className="text-center font-semibold">

                  <div
                    className={
                      isOutOfStock
                        ? "text-red-600"
                        : isLowStock
                        ? "text-yellow-600"
                        : "text-green-600"
                    }
                  >
                    {available}
                  </div>

                  {/* PROGRESS BAR */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className={`h-2 rounded-full ${
                        isLowStock ? "bg-red-500" : "bg-green-500"
                      }`}
                      style={{
                        width: `${Math.min(
                          (available / (product.totalStock || 1)) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>

                </td>

                {/* STATUS */}
                <td className="text-center">

                  {isOutOfStock ? (
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                      Out of Stock
                    </span>

                  ) : isLowStock ? (
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                      Low Stock
                    </span>

                  ) : (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      In Stock
                    </span>
                  )}

                </td>

                {/* ACTIONS */}
                <td className="text-center">
                  <div className="flex justify-center gap-2">

                    <button
                      onClick={() => onView(product)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                    >
                      View
                    </button>

                    <button
                      onClick={() => onEdit(product)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onRestock(product)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                    >
                      Restock
                    </button>

                    <button
                      onClick={() => onDelete(product)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>

                  </div>
                </td>

              </tr>
            );
          })}
        </tbody>

      </table>
    </div>
  );
}

export default ProductsTable;