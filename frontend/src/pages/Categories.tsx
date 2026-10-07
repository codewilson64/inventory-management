import {
  Plus,
  Search,
  Pencil,
  Trash2,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useGetCategoryWithProductCount } from "../hooks/category/useGetCategoryWithProductCount";

function Categories() {
  const { data: categories = [], isLoading, isError } = useGetCategoryWithProductCount()

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
    <div className="md:flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <main className="flex-1">
        {/* Header */}
        <header className="border-b bg-white px-8 py-5">
          <h2 className="text-2xl font-semibold text-gray-900">
            Categories
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your product categories
          </p>
        </header>

        <div className="p-8">
          {/* Toolbar */}
          <div className="mb-6 flex items-center justify-between">
            <div className="relative w-80">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search categories..."
                className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-gray-500"
              />
            </div>

            <button className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800">
              <Plus size={18} />
              Add Category
            </button>
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-xl border bg-white">
            <table className="w-full">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    Category Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    Products
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {categories.map((category) => (
                  <tr key={category.category_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-500">
                      #{category.category_id}
                    </td>

                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {category.name}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {category.product_count} products
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900">
                          <Pencil size={17} />
                        </button>

                        <button className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600">
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t px-6 py-4">
              <p className="text-sm text-gray-500">
                Showing 1 to 5 of 5 categories
              </p>

              <div className="flex gap-2">
                <button
                  disabled
                  className="rounded-lg border px-3 py-1.5 text-sm text-gray-400"
                >
                  Previous
                </button>

                <button className="rounded-lg bg-gray-900 px-3 py-1.5 text-sm text-white">
                  1
                </button>

                <button className="rounded-lg border px-3 py-1.5 text-sm text-gray-600">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Categories;