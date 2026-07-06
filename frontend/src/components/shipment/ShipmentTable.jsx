import ShipmentStatusBadge from "./ShipmentStatusBadge";

function ShipmentTable({ shipments, onView }) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-4 text-left">Tracking ID</th>
            <th className="px-6 py-4 text-left">Order ID</th>
            <th className="px-6 py-4 text-left">Customer</th>
            <th className="px-6 py-4 text-center">Current Hub</th>
            <th className="px-6 py-4 text-center">Status</th>
            <th className="px-6 py-4 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {shipments.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                className="text-center py-10 text-gray-500"
              >
                <div className="flex flex-col items-center">
                  <span className="text-5xl mb-3">🚚</span>

                  <h3 className="text-lg font-semibold">
                    No Shipments Found
                  </h3>

                  <p className="text-sm text-gray-400 mt-1">
                    There are currently no shipments.
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            shipments.map((shipment) => (
              <tr
                key={shipment.trackingId}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 font-semibold">
                  {shipment.trackingId}
                </td>

                <td className="px-6 py-4">
                  {shipment.orderId}
                </td>

                <td className="px-6 py-4">
                  {shipment.customerId}
                </td>

                <td className="px-6 py-4 text-center">
                  {shipment.currentHub || "-"}
                </td>

                <td className="px-6 py-4 text-center">
                  <ShipmentStatusBadge
                    status={shipment.status}
                  />
                </td>

                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => onView(shipment)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
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
  );
}

export default ShipmentTable;