import { FaChartLine } from "react-icons/fa";

function Analytics() {
  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Analytics Service
        </h1>

        <p className="text-gray-500 mt-1">
          Monitor business insights and analytics.
        </p>
      </div>

      {/* Placeholder Card */}
      <div className="bg-white rounded-xl shadow-md p-12 flex flex-col items-center justify-center">
        <FaChartLine className="text-6xl text-blue-600 mb-6" />

        <h2 className="text-2xl font-semibold mb-2">
          Analytics Service
        </h2>

        <p className="text-gray-500 text-center max-w-xl">
          This page will display business analytics such as sales trends,
          revenue reports, order statistics, inventory insights, customer
          analytics, and system performance.
        </p>

        <div className="mt-8 text-sm text-gray-400">
          🚧 Under Development
        </div>
      </div>
    </div>
  );
}

export default Analytics;