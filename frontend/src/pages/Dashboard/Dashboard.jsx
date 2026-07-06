import { useEffect, useState } from "react";
import { getDashboardData } from "../../services/dashboardService";
import StatCard from "../../components/dashboard/StatCard";
import RecentOrdersTable from "../../components/dashboard/RecentOrdersTable";
import RecentShipmentsTable from "../../components/dashboard/RecentShipmentsTable";
import RecentNotifications from "../../components/dashboard/RecentNotifications";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();

    const interval = setInterval(() => {
      loadDashboard();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboardData();
      

      // =========================
      // ORDER STATS
      // =========================
      const totalOrders = data.orders.length;

      const pendingOrders = data.orders.filter(
        (order) => order.status !== "DELIVERED"
      ).length;

      const deliveredOrders = data.orders.filter(
        (order) => order.status === "DELIVERED"
      ).length;

      // =========================
      // PRODUCT STATS
      // =========================
      const totalProducts = data.inventory.products;

      // =========================
      // SHIPMENT STATS
      // =========================
      const totalShipments = data.shipments.length;

      const createdShipments = data.shipments.filter(
        (shipment) => shipment.status === "CREATED"
      ).length;

      const inTransitShipments = data.shipments.filter(
        (shipment) =>
          shipment.status === "PACKAGED" ||
          shipment.status === "PICKED_UP" ||
          shipment.status === "AT_ORIGIN_HUB" ||
          shipment.status === "IN_TRANSIT" ||
          shipment.status === "AT_DESTINATION_HUB" ||
          shipment.status === "OUT_FOR_DELIVERY"
      ).length;

      const deliveredShipments = data.shipments.filter(
        (shipment) => shipment.status === "DELIVERED"
      ).length;

      setStats({
        totalOrders,
        pendingOrders,
        deliveredOrders,
        totalProducts,

        totalShipments,
        createdShipments,
        inTransitShipments,
        deliveredShipments,

        recentOrders: data.orders,
        recentShipments: data.shipments,
      });
    } catch (err) {
      console.error("Dashboard Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-lg">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Welcome to the Order Management System
        </p>
      </div>

      {/* ========================= */}
      {/* ORDER SUMMARY */}
      {/* ========================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          color="text-blue-600"
        />

        <StatCard
          title="Pending Orders"
          value={stats.pendingOrders}
          color="text-yellow-500"
        />

        <StatCard
          title="Delivered Orders"
          value={stats.deliveredOrders}
          color="text-green-600"
        />

        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          color="text-purple-600"
        />
      </div>

      {/* ========================= */}
      {/* SHIPMENT SUMMARY */}
      {/* ========================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Total Shipments"
          value={stats.totalShipments}
          color="text-indigo-600"
        />

        <StatCard
          title="Created"
          value={stats.createdShipments}
          color="text-blue-500"
        />

        <StatCard
          title="In Transit"
          value={stats.inTransitShipments}
          color="text-orange-500"
        />

        <StatCard
          title="Delivered"
          value={stats.deliveredShipments}
          color="text-green-600"
        />
      </div>

      {/* ========================= */}
      {/* RECENT ORDERS & SHIPMENTS */}
      {/* ========================= */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <RecentOrdersTable
          orders={stats.recentOrders}
        />

        <RecentShipmentsTable
          shipments={stats.recentShipments}
        />

        <RecentNotifications />

      </div>
    </div>
  );
}

export default Dashboard;