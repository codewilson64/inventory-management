import {
  Package,
  Search,
  Plus,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useGetProductsWithCategory } from "../hooks/product/useGetProductsWithCategory";
import { useNavigate } from "react-router-dom";

function Products() {
  const navigate = useNavigate()
  const { data: products = [], isLoading, isError } = useGetProductsWithCategory()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Loading products...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-500">
          Failed to load products.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 md:flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <main className="flex-1">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b bg-white px-6">
          <h2 className="text-lg font-semibold">Products</h2>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-sm font-medium text-white">
              A
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-medium">Admin</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
        </header>

        <div className="p-6">
          {/* Page title */}
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Products
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Manage your inventory products.
              </p>
            </div>

            <button onClick={() => navigate('/products/create')} className="flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800">
              <Plus size={18} />
              Add Product
            </button>
          </div>

          {/* Products card */}
          <div className="overflow-hidden rounded-xl border bg-white">
            {/* Filters */}
            <div className="flex flex-col gap-3 border-b p-4 md:flex-row">
              {/* Search */}
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full rounded-lg border px-10 py-2.5 text-sm outline-none focus:border-gray-400"
                />
              </div>

              {/* Category */}
              <select className="rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-gray-400">
                <option>All Categories</option>
                <option>Electronics</option>
                <option>Computer Accessories</option>
                <option>Furniture</option>
                <option>Office Supplies</option>
              </select>
            </div>

            {/* Table */}
            <div className="w-full overflow-x-auto rounded-lg">
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead className="border-b bg-gray-50">
                <tr>
                    <th className="whitespace-nowrap px-6 py-4 font-medium text-gray-500">
                    Product
                    </th>

                    <th className="whitespace-nowrap px-6 py-4 font-medium text-gray-500">
                    Category
                    </th>

                    <th className="whitespace-nowrap px-6 py-4 font-medium text-gray-500">
                    Price
                    </th>

                    <th className="whitespace-nowrap px-6 py-4 font-medium text-gray-500">
                    Stock
                    </th>

                    <th className="whitespace-nowrap px-6 py-4 text-right font-medium text-gray-500">
                    Actions
                    </th>
                </tr>
                </thead>

                <tbody>
                {products.map((product) => (
                    <tr
                    key={product.product_id}
                    className="border-b last:border-0 hover:bg-gray-50"
                    >
                    {/* Product */}
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                            <Package size={20} />
                        </div>

                        <div className="min-w-0">
                            <p className="truncate font-medium text-gray-900">
                            {product.name}
                            </p>

                            <p className="text-xs text-gray-500">
                            ID #{product.product_id}
                            </p>
                        </div>
                        </div>
                    </td>

                    {/* Category */}
                    <td className="whitespace-nowrap px-6 py-4 text-gray-600">
                        {product.category}
                    </td>

                    {/* Price */}
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                        Rp {product.price.toLocaleString("id-ID")}
                    </td>

                    {/* Stock */}
                    <td className="whitespace-nowrap px-6 py-4">
                        <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                            product.stock <= 5
                            ? "bg-red-100 text-red-700"
                            : product.stock <= 10
                                ? "bg-orange-100 text-orange-700"
                                : "bg-green-100 text-green-700"
                        }`}
                        >
                        {product.stock} units
                        </span>
                    </td>

                    {/* Actions */}
                    <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex justify-end gap-2">
                        <button
                            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                            title="Edit"
                        >
                            <Pencil size={17} />
                        </button>

                        <button
                            className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600"
                            title="Delete"
                        >
                            <Trash2 size={17} />
                        </button>
                        </div>
                    </td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t px-6 py-4">
              <p className="text-sm text-gray-500">
                Showing <span className="font-medium text-gray-900">1</span>{" "}
                to{" "}
                <span className="font-medium text-gray-900">6</span> of{" "}
                <span className="font-medium text-gray-900">24</span>{" "}
                products
              </p>

              <div className="flex gap-2">
                <button className="rounded-lg border p-2 text-gray-500 hover:bg-gray-50">
                  <ChevronLeft size={18} />
                </button>

                <button className="rounded-lg bg-gray-900 px-3 py-2 text-sm text-white">
                  1
                </button>

                <button className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50">
                  2
                </button>

                <button className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50">
                  3
                </button>

                <button className="rounded-lg border p-2 text-gray-500 hover:bg-gray-50">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Products;