import { useEffect, useState } from "react";
import { getSyncLogs } from "../../services/syncService";

function SyncMonitor() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLog, setSelectedLog] = useState(null);

  const loadLogs = async () => {
    try {
      const data = await getSyncLogs();
      setLogs(data);
    } catch (err) {
      console.error("Failed to load sync logs:", err);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await loadLogs();
      setLoading(false);
    };

    fetchData(); // initial load

    const interval = setInterval(() => {
      loadLogs(); // background refresh (no loading spinner)
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "PUBLISHED":
        return "bg-green-100 text-green-700";

      case "VALIDATED":
        return "bg-blue-100 text-blue-700";

      case "RECEIVED":
        return "bg-yellow-100 text-yellow-700";

      case "FAILED":
        return "bg-red-100 text-red-700";

      case "DUPLICATE":
        return "bg-gray-200 text-gray-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getOrderStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-gray-100 text-gray-700";

      case "PROCESSING":
        return "bg-yellow-100 text-yellow-700";

      case "SHIPPED":
        return "bg-blue-100 text-blue-700";

      case "DELIVERED":
        return "bg-green-100 text-green-700";

      case "CANCELLED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-lg">
        Loading Sync Logs...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Website Orders
        </h1>

        <p className="text-gray-500 mt-1">
          Monitor orders received from external systems
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-6 py-4">
                External Order
              </th>

              <th className="text-left px-6 py-4">
                OMS Order
              </th>

              <th className="text-left px-6 py-4">
                Status
              </th>

              <th className="text-left px-6 py-4">
                Order Status
              </th>

              <th className="text-left px-6 py-4">
                Synced At
              </th>

              <th className="text-left px-6 py-4">
                Reason
              </th>

              <th className="text-left px-6 py-4">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {logs.length > 0 ? (
              logs.map((log) => (
                <tr
                  key={log._id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium">
                    {log.externalOrderId}
                  </td>

                  <td className="px-6 py-4">
                    {log.omsOrderId || "-"}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        log.status
                      )}`}
                    >
                      {log.status}
                    </span>
                  </td>

                  {/* ✅ NEW COLUMN: Order Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getOrderStatusColor(
                        log.orderStatus
                      )}`}
                    >
                      {log.orderStatus || "-"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>

                  <td className="px-6 py-4 text-red-600">
                    {log.reason || "-"}
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedLog(log)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-10 text-gray-500"
                >
                  No sync logs available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedLog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 relative">

            {/* Close Button */}
            <button
              onClick={() => setSelectedLog(null)}
              className="absolute top-4 right-4 text-2xl font-bold text-gray-500 hover:text-red-600"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-8">
              Sync Order Details
            </h2>

            {/* Sync Information */}
            <div className="grid grid-cols-2 gap-6 mb-8">

              <div>
                <p className="text-gray-500 text-sm">External Order ID</p>
                <p className="font-semibold">
                  {selectedLog.externalOrderId}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">OMS Order ID</p>
                <p className="font-semibold">
                  {selectedLog.omsOrderId || "-"}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Status</p>
                <p className="font-semibold">
                  {selectedLog.status}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Created At</p>
                <p className="font-semibold">
                  {new Date(selectedLog.createdAt).toLocaleString()}
                </p>
              </div>

            </div>

            <hr className="mb-6" />

            {/* Original Payload */}
            <h3 className="text-xl font-semibold mb-6">
              External Order Information
            </h3>

            {/* Customer */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-3 border-b pb-2">
                Customer
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-sm">Customer ID</p>
                  <p className="font-medium">
                    {selectedLog.payload.customer.id}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Payment Method</p>
                  <p className="font-medium">
                    {selectedLog.payload.paymentMethod}
                  </p>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-3 border-b pb-2">
                Shipping Address
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-sm">Name</p>
                  <p>{selectedLog.payload.shippingAddress.name}</p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Phone</p>
                  <p>{selectedLog.payload.shippingAddress.phone}</p>
                </div>

                <div className="col-span-2">
                  <p className="text-gray-500 text-sm">Address</p>
                  <p>
                    {selectedLog.payload.shippingAddress.address},
                    {" "}
                    {selectedLog.payload.shippingAddress.city},
                    {" "}
                    {selectedLog.payload.shippingAddress.state}
                    {" - "}
                    {selectedLog.payload.shippingAddress.pincode}
                  </p>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-3 border-b pb-2">
                Ordered Products
              </h4>

              <table className="w-full border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left p-3">SKU</th>
                    <th className="text-left p-3">Product</th>
                    <th className="text-center p-3">Qty</th>
                    <th className="text-right p-3">Price</th>
                  </tr>
                </thead>

                <tbody>
                  {selectedLog.payload.items.map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-3">{item.sku}</td>

                      <td className="p-3">{item.name}</td>

                      <td className="text-center p-3">
                        {item.quantity}
                      </td>

                      <td className="text-right p-3">
                        ₹{item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total */}
            <div className="flex justify-end">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-gray-500 text-sm">
                  Total Amount
                </p>

                <p className="text-2xl font-bold text-blue-700">
                  ₹{selectedLog.payload.totalAmount}
                </p>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default SyncMonitor;