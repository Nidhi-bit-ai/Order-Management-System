function InventoryStats({ stats }) {
  if (!stats) return null;

  const totalProducts = stats.products || 0;
  const totalUnits = stats.totalUnits || 0;
  const reservedUnits = stats.reservedUnits || 0;
  const lowStockProducts = stats.lowStockProducts || 0;

  const availableUnits = totalUnits - reservedUnits;

  // STEP 7.3 - Inventory Health Logic
  const inventoryHealth =
    lowStockProducts === 0 ? "Healthy" : "Needs Attention";

  const cards = [
    {
      title: "Total Products",
      value: totalProducts,
      color: "bg-blue-500",
    },
    {
      title: "Total Stock",
      value: totalUnits,
      color: "bg-green-500",
    },
    {
      title: "Reserved Stock",
      value: reservedUnits,
      color: "bg-yellow-500",
    },
    {
      title: "Available Stock",
      value: availableUnits,
      color: "bg-emerald-500",
    },
    {
      title: "Low Stock Products",
      value: lowStockProducts,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="space-y-5">

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-xl shadow-sm p-5 border"
          >
            <div className={`w-12 h-12 rounded-lg ${card.color} mb-4`} />

            <p className="text-gray-500 text-sm">{card.title}</p>

            <h2 className="text-3xl font-bold mt-2">
              {card.value}
            </h2>
          </div>
        ))}
      </div>

      {/* STEP 7.3 - INVENTORY HEALTH CARD */}
      <div className="bg-white rounded-xl shadow-sm p-5 border flex items-center justify-between">

        <div>
          <p className="text-gray-500 text-sm">
            Inventory Health
          </p>

          <h2
            className={`text-2xl font-bold mt-1 ${
              inventoryHealth === "Healthy"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {inventoryHealth === "Healthy"
              ? "🟢 Healthy"
              : "🔴 Needs Attention"}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {lowStockProducts} product(s) need attention
          </p>
        </div>

        {/* RIGHT SIDE STATUS DOT */}
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold ${
            inventoryHealth === "Healthy"
              ? "bg-green-500"
              : "bg-red-500"
          }`}
        >
          {inventoryHealth === "Healthy" ? "✓" : "!"}
        </div>

      </div>

    </div>
  );
}

export default InventoryStats;