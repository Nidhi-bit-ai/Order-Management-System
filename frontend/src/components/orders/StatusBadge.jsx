function StatusBadge({ status }) {
  const statusStyles = {
    CREATED: "bg-blue-100 text-blue-700",

    CONFIRMED: "bg-indigo-100 text-indigo-700",

    PROCESSING: "bg-yellow-100 text-yellow-700",

    PACKAGED: "bg-orange-100 text-orange-700",

    PICKED_UP: "bg-purple-100 text-purple-700",

    AT_ORIGIN_HUB: "bg-cyan-100 text-cyan-700",

    IN_TRANSIT: "bg-sky-100 text-sky-700",

    AT_DESTINATION_HUB: "bg-teal-100 text-teal-700",

    OUT_FOR_DELIVERY: "bg-pink-100 text-pink-700",

    DELIVERED: "bg-green-100 text-green-700",

    CANCELLED: "bg-red-100 text-red-700",

    FAILED: "bg-gray-200 text-gray-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        statusStyles[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status.replaceAll("_", " ")}
    </span>
  );
}

export default StatusBadge;