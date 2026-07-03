import { useState } from "react";
import StatusBadge from "./StatusBadge";
import ViewOrderModal from "./ViewOrderModal";

function OrdersTable({ orders }) {
    const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left">Order ID</th>
              <th className="px-6 py-4 text-left">Customer</th>
              <th className="px-6 py-4 text-center">Items</th>
              <th className="px-6 py-4 text-right">Total Amount</th>
              <th className="px-6 py-4 text-center">Order Date</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
                <tr>
                <td
                    colSpan="7"
                    className="text-center py-10 text-gray-500"
                >
                    <div className="flex flex-col items-center">
                    <span className="text-5xl mb-3">📦</span>

                    <h3 className="text-lg font-semibold">
                        No orders found
                    </h3>

                    <p className="text-sm text-gray-400 mt-1">
                        Try changing your search or filter.
                    </p>
                    </div>
                </td>
                </tr>
            ) : (
                orders.map((order) => (
                <tr
                    key={order.id}
                    className="border-t hover:bg-gray-50 transition"
                >
                    <td className="px-6 py-4 font-semibold">
                    {order.id}
                    </td>

                    <td className="px-6 py-4">
                    {order.customer}
                    </td>

                    <td className="px-6 py-4 text-center">
                    {order.items.length}
                    </td>

                    <td className="px-6 py-4 text-right font-medium">
                    ₹{order.totalAmount.toLocaleString("en-IN")}
                    </td>

                    <td className="px-6 py-4 text-center">
                    {order.orderDate}
                    </td>

                    <td className="px-6 py-4 text-center">
                    <StatusBadge status={order.status} />
                    </td>

                    <td className="px-6 py-4 text-center">
                    <button
                        onClick={() => setSelectedOrder(order)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                    >
                        View
                    </button>
                    </td>
                </tr>
                ))
            )}
            </tbody>
        </table>
      </div>

      <ViewOrderModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </>
  );
}

export default OrdersTable;