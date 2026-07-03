import StatCard from "../../components/dashboard/StatCard";
import RecentOrdersTable from "../../components/dashboard/RecentOrdersTable";
function Dashboard() {
  return (
    <div className="space-y-8">

      {/* Page Heading */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Welcome to the Order Management System
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          title="Total Orders"
          value="120"
          color="text-blue-600"
        />

        <StatCard
          title="Pending Orders"
          value="18"
          color="text-yellow-500"
        />

        <StatCard
          title="Delivered Orders"
          value="95"
          color="text-green-600"
        />

        <StatCard
          title="Revenue"
          value="₹1,25,000"
          color="text-purple-600"
        />

      </div>
        <RecentOrdersTable />
    </div>
  );
}

export default Dashboard;