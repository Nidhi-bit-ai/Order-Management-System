import { useState } from "react";

import OrdersTable from "../../components/orders/OrdersTable";
import SearchBar from "../../components/orders/SearchBar";
import StatusFilter from "../../components/orders/StatusFilter";
import Pagination from "../../components/orders/Pagination";

import ordersData from "../../data/orders";

function Orders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  // Filter orders
  const filteredOrders = ordersData.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Reset to first page whenever search/filter changes
  

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedOrders = filteredOrders.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Orders
        </h1>

        <p className="text-gray-500 mt-1">
          Manage all customer orders from one place.
        </p>
      </div>

      {/* Search + Filter */}
      <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col md:flex-row gap-4 justify-between">
        <SearchBar
            value={searchTerm}
            onChange={(value) => {
                setSearchTerm(value);
                setCurrentPage(1);
            }}
        />

        <StatusFilter
            value={statusFilter}
            onChange={(value) => {
                setStatusFilter(value);
                setCurrentPage(1);
            }}
        />
      </div>

      {/* Orders Table */}
      <OrdersTable orders={paginatedOrders} />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={filteredOrders.length}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
}

export default Orders;