import { useState } from "react";
import ShipmentStatusBadge from "./ShipmentStatusBadge";
import {
  packageShipment,
  pickupShipment,
  moveShipment,
  outForDelivery,
  deliverShipment,
} from "../../services/shipmentService";

function ViewShipmentModal({ shipment, onClose,onShipmentUpdated }) {
  if (!shipment) return null;
  const [loading, setLoading] = useState(false);

  const handlePackage = async () => {
    try {
      setLoading(true);

      await packageShipment(shipment.trackingId);

      alert("Shipment packaged successfully.");

      if (onShipmentUpdated) {
        await onShipmentUpdated();
      }

      onClose();
    } catch (err) {
      console.error(err);
      alert("Unable to package shipment.");
    } finally {
      setLoading(false);
    }
  };

  const handlePickup = async () => {
    try {
      setLoading(true);

      await pickupShipment(shipment.trackingId);

      alert("Shipment picked up successfully.");

      if (onShipmentUpdated) {
        await onShipmentUpdated();
      }

      onClose();
    } catch (err) {
      console.error(err);
      alert("Unable to pickup shipment.");
    } finally {
      setLoading(false);
    }
  };

  const handleMove = async () => {
    try {
      setLoading(true);

      await moveShipment(shipment.trackingId);

      alert("Shipment moved successfully");

      await onShipmentUpdated();

      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Move failed");
    } finally {
      setLoading(false);
    }
  };

  const handleOutForDelivery = async () => {
    try {
      setLoading(true);

      await outForDelivery(shipment.trackingId);

      alert("Shipment is out for delivery");

      await onShipmentUpdated();

      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelivered = async () => {
    try {
      setLoading(true);

      await deliverShipment(shipment.trackingId);

      alert("Shipment delivered");

      await onShipmentUpdated();

      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-5">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-xl max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center rounded-t-xl">

          <div>
            <h2 className="text-2xl font-bold">
              Shipment Details
            </h2>

            <p className="text-gray-500 mt-1">
              {shipment.trackingId}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-3xl text-gray-500 hover:text-red-600"
          >
            ×
          </button>

        </div>

        {/* Body */}
        <div className="p-6 space-y-8">

          {/* Basic Details */}
          <div className="grid grid-cols-2 gap-6">

            <div>
              <p className="text-gray-500">Tracking ID</p>
              <p className="font-semibold">
                {shipment.trackingId}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Order ID</p>
              <p className="font-semibold">
                {shipment.orderId}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Customer ID</p>
              <p className="font-semibold">
                {shipment.customerId}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Current Hub</p>
              <p className="font-semibold">
                {shipment.currentHub || "-"}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Shipment Status</p>

              <ShipmentStatusBadge
                status={shipment.status}
              />
            </div>

            <div>
              <p className="text-gray-500">Created On</p>
              <p className="font-semibold">
                {new Date(shipment.createdAt).toLocaleString()}
              </p>
            </div>

          </div>

          {/* Shipping Address */}

          {shipment.shippingAddress && (

            <div>

              <h3 className="text-lg font-semibold mb-3">
                Shipping Address
              </h3>

              <div className="bg-gray-50 rounded-lg p-4 space-y-1">

                <p>
                  <strong>Name:</strong>{" "}
                  {shipment.shippingAddress.name}
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  {shipment.shippingAddress.phone}
                </p>

                <p>
                  <strong>Address:</strong>{" "}
                  {shipment.shippingAddress.address}
                </p>

                <p>
                  {shipment.shippingAddress.city},{" "}
                  {shipment.shippingAddress.state} -{" "}
                  {shipment.shippingAddress.pincode}
                </p>

              </div>

            </div>

          )}

        </div>

        {/* Footer */}

        <div className="sticky bottom-0 bg-white border-t p-5 flex justify-between rounded-b-xl">

          <div className="flex gap-3">

            {shipment.status === "CREATED" && (
              <button
                disabled={loading}
                onClick={handlePackage}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg"
              >
                {loading ? "Packaging..." : "Package Shipment"}
              </button>
            )}

            {shipment.status === "PACKAGED" && (
              <button
                disabled={loading}
                onClick={handlePickup}
                className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg"
              >
                {loading ? "Picking Up..." : "Pickup Shipment"}
              </button>
            )}

            {shipment.status === "PICKED_UP" && (
              <button
                disabled={loading}
                onClick={handleMove}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg"
              >
                Move to Hub
              </button>
            )}

            {shipment.status === "AT_HUB" &&
              shipment.routeIndex < shipment.route.length - 1 && (
                <button
                  disabled={loading}
                  onClick={handleMove}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg"
                >
                  Move to Next Hub
                </button>
            )}

            {shipment.status === "AT_HUB" &&
              shipment.routeIndex === shipment.route.length - 1 && (
                <button
                  disabled={loading}
                  onClick={handleOutForDelivery}
                  className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg"
                >
                  Out For Delivery
                </button>
            )}

            {shipment.status === "OUT_FOR_DELIVERY" && (
              <button
                disabled={loading}
                onClick={handleDelivered}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
              >
                Deliver Shipment
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

export default ViewShipmentModal;