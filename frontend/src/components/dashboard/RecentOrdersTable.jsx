

function RecentOrdersTable({ orders }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">
        Recent Orders
      </h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3">Order ID</th>
            <th className="text-left py-3">Customer</th>
            <th className="text-left py-3">Status</th>
            <th className="text-left py-3">Amount</th>
          </tr>
        </thead>

        <tbody>
          {orders
            .sort(
              (a, b) =>
                new Date(b.createdAt) -
                new Date(a.createdAt)
            )
            .slice(0, 5)
            .map((order) => (
              <tr
                key={order.orderId}
                className="border-b hover:bg-gray-50"
              >
                <td className="py-3 font-medium">
                  {order.orderId}
                </td>

                <td>{order.customerId}</td>

                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium
                      ${
                        order.status === "DELIVERED"
                          ? "bg-green-100 text-green-700"
                          : order.status === "CREATED"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === "CANCELLED"
                          ? "bg-red-100 text-red-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td>₹{order.totalAmount}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentOrdersTable;