import { useEffect, useState, useCallback } from "react";

import ProductsTable from "../../components/products/ProductsTable";
import SearchBar from "../../components/products/SearchBar";
import CategoryFilter from "../../components/products/CategoryFilter";
import Pagination from "../../components/products/Pagination";

import {
  getProducts,
  getInventoryStats,
} from "../../services/productService";
import InventoryStats from "../../components/products/InventoryStats";
import ViewProductModal from "../../components/products/ViewProductModal";
import EditProductModal from "../../components/products/EditProductModal";
import RestockModal from "../../components/products/RestockModal";
import CreateProductModal from "../../components/products/CreateProductModal";
import DeleteProductModal from "../../components/products/DeleteProductModal";


function Products() {
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [restockProductData, setRestockProductData] = useState(null);
  const [createModalOpen, setCreateModalOpen] =useState(false);
  const [deleteProductData, setDeleteProductData] = useState(null);
  const [stats, setStats] = useState(null);
  
  const itemsPerPage = 5;

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);

      const [products, inventoryStats] =
        await Promise.all([
          getProducts(),
          getInventoryStats(),
        ]);

      setProductsData(products);
      setStats(inventoryStats);

    } catch (error) {
      console.error(
        "Failed to fetch products:",
        error
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Unique Categories
  const categories = [
    ...new Set(productsData.map((product) => product.category)),
  ];

  // Search + Filter
  const filteredProducts = productsData.filter((product) => {
    const matchesSearch =
      product.productId
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" ||
      product.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(
    filteredProducts.length / itemsPerPage
  );

  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (loading) {
    return (
      <div className="text-center py-20 text-lg">
        Loading products...
      </div>
    );
  }

  const enrichProducts = paginatedProducts.map((p) => {
    const availableStock = (p.totalStock || 0) - (p.reservedStock || 0);

    return {
      ...p,
      availableStock,
    };
  });

  return (
    <div className="space-y-6">

      {/* Heading */}
      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold text-gray-800">
            Products
          </h1>

          <p className="text-gray-500 mt-1">
            Manage products and inventory.
          </p>

        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow"
        >
          + Add Product
        </button>

      </div>
      <InventoryStats stats={stats} />
      {/* Search + Filter */}
      <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col md:flex-row gap-4 justify-between">

        <SearchBar
          value={searchTerm}
          onChange={(value) => {
            setSearchTerm(value);
            setCurrentPage(1);
          }}
        />

        <CategoryFilter
          categories={categories}
          value={categoryFilter}
          onChange={(value) => {
            setCategoryFilter(value);
            setCurrentPage(1);
          }}
        />

      </div>

      {/* Products Table */}
      <ProductsTable
        products={enrichProducts}
        onView={(product) =>
          setSelectedProduct(product)
        }
        onEdit={(product) =>
          setEditProduct(product)
        }
        onRestock={(product) =>
          setRestockProductData(product)
        }
        onDelete={(product) =>
          setDeleteProductData(product)
        }
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <ViewProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <EditProductModal
        open={!!editProduct}
        product={editProduct}
        onClose={() => setEditProduct(null)}
        onProductUpdated={fetchProducts}
      />

      <RestockModal
        open={!!restockProductData}
        product={restockProductData}
        onClose={() => setRestockProductData(null)}
        onProductUpdated={fetchProducts}
      />

      <CreateProductModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onProductCreated={fetchProducts}
      />

      <DeleteProductModal
        open={!!deleteProductData}
        product={deleteProductData}
        onClose={() => setDeleteProductData(null)}
        onDeleted={fetchProducts}
      />

    </div>
  );
}

export default Products;