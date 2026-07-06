function ShipmentStatusBadge({ status }) {
  const colors = {
    CREATED: "bg-blue-100 text-blue-700",

    PACKAGED: "bg-indigo-100 text-indigo-700",

    PICKED_UP: "bg-purple-100 text-purple-700",

    AT_ORIGIN_HUB: "bg-yellow-100 text-yellow-700",

    IN_TRANSIT: "bg-orange-100 text-orange-700",

    AT_DESTINATION_HUB: "bg-pink-100 text-pink-700",

    OUT_FOR_DELIVERY: "bg-cyan-100 text-cyan-700",

    DELIVERED: "bg-green-100 text-green-700",

    CANCELLED: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold ${
        colors[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status.replaceAll("_", " ")}
    </span>
  );
}

export default ShipmentStatusBadge;