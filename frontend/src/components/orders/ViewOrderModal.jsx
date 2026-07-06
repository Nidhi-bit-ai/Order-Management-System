import StatusBadge from "./StatusBadge";
import { cancelOrder } from "../../services/orderService";
function ViewOrderModal({ order, onClose, onOrderCancelled }) {
  if (!order) return null;
    const handleCancel = async () => {
    if (!window.confirm("Cancel this order?")) return;

    try {
        await cancelOrder(order.orderId);

        alert("Order cancelled successfully.");

        onOrderCancelled?.();

        onClose();
    } catch (err) {
        console.error(err);

        alert(
        err?.response?.data?.message ||
        "Unable to cancel order."
        );
    }
    };
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-5">

      <div className="bg-white w-full max-w-5xl rounded-xl shadow-xl max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="flex justify-between items-center border-b p-6 sticky top-0 bg-white rounded-t-xl">

          <div>
            <h2 className="text-2xl font-bold">
              Order Details
            </h2>

            <p className="text-gray-500">
              {order.orderId}
            </p>

            {order.externalOrderId && (
              <p className="text-sm text-gray-400">
                External ID: {order.externalOrderId}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-3xl font-bold text-gray-500 hover:text-red-600"
          >
            ×
          </button>

        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6">

          {/* Order Info */}

          <div className="grid grid-cols-2 gap-6">

            <div>
              <p className="text-gray-500">Customer ID</p>
              <p className="font-semibold">{order.customerId}</p>
            </div>

            <div>
              <p className="text-gray-500">Created On</p>
              <p className="font-semibold">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Status</p>
              <StatusBadge status={order.status} />
            </div>

            <div>
              <p className="text-gray-500">Payment Status</p>
              <p className="font-semibold">
                {order.paymentStatus}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Source</p>
              <p className="font-semibold">
                {order.source}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Total Amount</p>
              <p className="font-bold text-lg text-green-600">
                ₹{order.totalAmount.toLocaleString("en-IN")}
              </p>
            </div>

          </div>

          {/* Shipping */}

          <div className="mt-8">

            <h3 className="text-xl font-semibold mb-3">
              Shipping Address
            </h3>

            <div className="bg-gray-50 rounded-lg p-4 space-y-2">

              <p><b>Name:</b> {order.shippingAddress?.name}</p>

              <p><b>Phone:</b> {order.shippingAddress?.phone}</p>

              <p><b>Address:</b> {order.shippingAddress?.address}</p>

              <p>
                {order.shippingAddress?.city},{" "}
                {order.shippingAddress?.state} -
                {" "}
                {order.shippingAddress?.pincode}
              </p>

            </div>

          </div>

          {/* Products */}

          <div className="mt-8">

            <h3 className="text-xl font-semibold mb-4">
              Ordered Products
            </h3>

            <table className="w-full">

              <thead className="bg-gray-100">

                <tr>

                  <th className="text-left p-3">
                    Product ID
                  </th>

                  <th className="text-left p-3">
                    Product Name
                  </th>

                  <th className="text-center p-3">
                    Qty
                  </th>

                  <th className="text-right p-3">
                    Price
                  </th>

                  <th className="text-right p-3">
                    Subtotal
                  </th>

                </tr>

              </thead>

              <tbody>

                {order.items.map((item, index) => (

                  <tr key={index} className="border-b">

                    <td className="p-3">
                      {item.productId}
                    </td>

                    <td className="p-3">
                      {item.name}
                    </td>

                    <td className="text-center p-3">
                      {item.quantity}
                    </td>

                    <td className="text-right p-3">
                      ₹{item.price}
                    </td>

                    <td className="text-right font-semibold p-3">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {/* Summary */}

          <div className="flex justify-end mt-8">

            <div className="w-80 space-y-3">

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{order.subtotal.toLocaleString("en-IN")}</span>
              </div>

              <div className="flex justify-between">
                <span>Tax</span>
                <span>₹{order.tax.toLocaleString("en-IN")}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹{order.shippingCost.toLocaleString("en-IN")}</span>
              </div>

              <hr />

              <div className="flex justify-between font-bold text-xl">
                <span>Total</span>

                <span>
                  ₹{order.totalAmount.toLocaleString("en-IN")}
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="border-t p-5 flex justify-between bg-white rounded-b-xl">

        <div>
            {order.status !== "DELIVERED" &&
            order.status !== "CANCELLED" && (
                <button
                onClick={handleCancel}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
                >
                Cancel Order
                </button>
            )}
        </div>

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