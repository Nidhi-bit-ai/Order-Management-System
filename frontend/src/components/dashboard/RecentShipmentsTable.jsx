function RecentShipmentsTable({ shipments = [] }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">
        Recent Shipments
      </h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3">Tracking ID</th>
            <th className="text-left py-3">Order</th>
            <th className="text-left py-3">Status</th>
          </tr>
        </thead>

        <tbody>
          {shipments.slice(0, 5).map((shipment) => (
            <tr
              key={shipment.trackingId}
              className="border-b hover:bg-gray-50"
            >
              <td className="py-3">{shipment.trackingId}</td>

              <td>{shipment.orderId}</td>

              <td>
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                  {shipment.status}
                </span>
              </td>
            </tr>
          ))}

          {shipments.length === 0 && (
            <tr>
              <td
                colSpan={3}
                className="py-5 text-center text-gray-500"
              >
                No shipments available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RecentShipmentsTable;