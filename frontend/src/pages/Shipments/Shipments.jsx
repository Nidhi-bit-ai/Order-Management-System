import { useEffect, useState, useCallback } from "react";

import { getShipments } from "../../services/shipmentService";

import ShipmentTable from "../../components/shipment/ShipmentTable";

import ViewShipmentModal from "../../components/shipment/ViewShipmentModal";

function Shipments() {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedShipment, setSelectedShipment] = useState(null);

  const fetchShipments = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getShipments();

      setShipments(data);
    } catch (error) {
      console.error("Failed to fetch shipments:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchShipments();
  }, [fetchShipments]);

  if (loading) {
    return (
      <div className="text-center py-20 text-lg">
        Loading shipments...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Heading */}

      <div>

        <h1 className="text-3xl font-bold text-gray-800">
          Shipments
        </h1>

        <p className="text-gray-500 mt-1">
          Manage all shipments from one place.
        </p>

      </div>

      {/* Shipment Table */}

      <ShipmentTable
        shipments={shipments}
        onView={setSelectedShipment}
      />

      <ViewShipmentModal
        shipment={selectedShipment}
        onClose={() => setSelectedShipment(null)}
        onShipmentUpdated={fetchShipments}
      />

    </div>
  );
}

export default Shipments;