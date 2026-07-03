const orders = [
  {
    id: "ORD001",
    customer: "Rahul Sharma",
    status: "Delivered",
    amount: "₹1200",
  },
  {
    id: "ORD002",
    customer: "Aman Gupta",
    status: "Pending",
    amount: "₹850",
  },
  {
    id: "ORD003",
    customer: "Neha Verma",
    status: "Shipped",
    amount: "₹950",
  },
];

function RecentOrdersTable() {
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
          {orders.map((order) => (
            <tr
              key={order.id}
              className="border-b hover:bg-gray-50"
            >
              <td className="py-3">{order.id}</td>

              <td>{order.customer}</td>

              <td>{order.status}</td>

              <td>{order.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentOrdersTable;