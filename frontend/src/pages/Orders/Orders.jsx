import { useEffect, useState, useCallback } from "react";

import OrdersTable from "../../components/orders/OrdersTable";
import SearchBar from "../../components/orders/SearchBar";
import StatusFilter from "../../components/orders/StatusFilter";
import Pagination from "../../components/orders/Pagination";
import CreateOrderModal from "../../components/orders/CreateOrderModal";

import { getOrders } from "../../services/orderService";

function Orders() {
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const [showCreateModal, setShowCreateModal] = useState(false);

  const itemsPerPage = 5;

  /**
   * =========================
   * FETCH ORDERS
   * =========================
   */
  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);

      const orders = await getOrders();
      setOrdersData(orders);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  /**
   * =========================
   * AFTER ORDER CREATION
   * =========================
   */
  const handleOrderCreated = async () => {
    await fetchOrders();
    setShowCreateModal(false);
  };

  /**
   * =========================
   * FILTER ORDERS
   * =========================
   */
  const filteredOrders = ordersData.filter((order) => {
    const matchesSearch =
      order.orderId
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      order.shippingAddress?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedOrders = filteredOrders.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (loading) {
    return (
      <div className="text-center py-20 text-lg">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Heading */}
      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Orders
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all customer orders from one place.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow"
        >
          + Create Order
        </button>

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
        <OrdersTable
        orders={paginatedOrders}
        onOrderCancelled={fetchOrders}
        />
      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={filteredOrders.length}
        itemsPerPage={itemsPerPage}
      />

      {/* Create Order Modal */}
      <CreateOrderModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onOrderCreated={handleOrderCreated}
      />

    </div>
  );
}

export default Orders;