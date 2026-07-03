import StatusBadge from "./StatusBadge";

function ViewOrderModal({ order, onClose }) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-xl p-6">

        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4">
          <div>
            <h2 className="text-2xl font-bold">
              Order Details
            </h2>

            <p className="text-gray-500">
              {order.id}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-red-500"
          >
            ✕
          </button>
        </div>

        {/* Customer Details */}
        <div className="grid grid-cols-2 gap-6 mt-6">

          <div>
            <p className="text-gray-500">Customer</p>
            <p className="font-semibold">{order.customer}</p>
          </div>

          <div>
            <p className="text-gray-500">Order Date</p>
            <p className="font-semibold">{order.orderDate}</p>
          </div>

          <div>
            <p className="text-gray-500">Status</p>
            <StatusBadge status={order.status} />
          </div>

          <div>
            <p className="text-gray-500">Total Amount</p>
            <p className="font-semibold">
              ₹{order.totalAmount.toLocaleString("en-IN")}
            </p>
          </div>

        </div>

        {/* Products */}
        <div className="mt-8">

          <h3 className="text-lg font-semibold mb-4">
            Ordered Products
          </h3>

          <table className="w-full border rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-3">Product</th>
                <th className="text-center px-4 py-3">Qty</th>
                <th className="text-right px-4 py-3">Price</th>
                <th className="text-right px-4 py-3">Subtotal</th>
              </tr>
            </thead>

            <tbody>
              {order.items.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-3">
                    {item.product}
                  </td>

                  <td className="px-4 py-3 text-center">
                    {item.quantity}
                  </td>

                  <td className="px-4 py-3 text-right">
                    ₹{item.price}
                  </td>

                  <td className="px-4 py-3 text-right font-medium">
                    ₹{item.price * item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-end">
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

export default ViewOrderModal;