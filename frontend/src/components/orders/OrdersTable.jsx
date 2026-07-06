import { useState } from "react";

import StatusBadge from "./StatusBadge";
import ViewOrderModal from "./ViewOrderModal";

function OrdersTable({ orders ,onOrderCancelled}) {
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left">Order ID</th>

              <th className="px-6 py-4 text-left">
                External ID
              </th>

              <th className="px-6 py-4 text-left">
                Customer
              </th>

              <th className="px-6 py-4 text-center">
                Source
              </th>

              <th className="px-6 py-4 text-center">
                Items
              </th>

              <th className="px-6 py-4 text-right">
                Total Amount
              </th>

              <th className="px-6 py-4 text-center">
                Payment
              </th>

              <th className="px-6 py-4 text-center">
                Status
              </th>

              <th className="px-6 py-4 text-center">
                Order Date
              </th>

              <th className="px-6 py-4 text-center">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td
                  colSpan="10"
                  className="text-center py-10 text-gray-500"
                >
                  <div className="flex flex-col items-center">
                    <span className="text-5xl mb-3">
                      📦
                    </span>

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
                  key={order.orderId}
                  className="border-t hover:bg-gray-50 transition"
                >
                  {/* Order ID */}
                  <td className="px-6 py-4 font-semibold">
                    {order.orderId}
                  </td>

                  {/* External Order ID */}
                  <td className="px-6 py-4">
                    {order.externalOrderId || "-"}
                  </td>

                  {/* Customer */}
                  <td className="px-6 py-4">
                    {order.shippingAddress?.name}
                  </td>

                  {/* Source */}
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.source === "SYNC"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {order.source}
                    </span>
                  </td>

                  {/* Items */}
                  <td className="px-6 py-4 text-center">
                    {order.items.length}
                  </td>

                  {/* Total */}
                  <td className="px-6 py-4 text-right font-medium">
                    ₹
                    {order.totalAmount.toLocaleString("en-IN")}
                  </td>

                  {/* Payment */}
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.paymentStatus === "SUCCESS"
                          ? "bg-green-100 text-green-700"
                          : order.paymentStatus === "FAILED"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 text-center">
                    <StatusBadge status={order.status} />
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 text-center">
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString("en-IN")}
                  </td>

                  {/* Action */}
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() =>
                        setSelectedOrder(order)
                      }
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
        onOrderCancelled={onOrderCancelled}
      />
    </>
  );
}

export default OrdersTable;