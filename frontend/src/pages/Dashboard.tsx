import {
  Package,
  Tags,
  ArrowDownToLine,
  ArrowUpFromLine,
  AlertTriangle,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useGetProductsCount } from "../hooks/product/useGetProductsCount";
import { useGetCategoriesCount } from "../hooks/category/useGetCategoriesCount";
import { useGetStockInCount } from "../hooks/transaction/useGetStockInCount";
import { useGetStockOutCount } from "../hooks/transaction/useGetStockOutCount";
import { useGetRecentTransactions } from "../hooks/transaction/useGetRecentTransactions";
import { formatTime } from "../helper/formatTime";
import { useGetLowStockProducts } from "../hooks/product/useGetLowStockProducts";

function Dashboard() {
  const { data: products_count, isLoading: productsLoading, isError: productsError } = useGetProductsCount()
  const { data: categories_count, isLoading: categoriesLoading, isError: categoriesError } = useGetCategoriesCount()
  const { data: stockIn_count, isLoading: stockInLoading, isError: stockInError } = useGetStockInCount()
  const { data: stockOut_count, isLoading: stockOutLoading, isError: stockOutError } = useGetStockOutCount()
  const { data: recentTransactions = [] } = useGetRecentTransactions()
  const { data: lowStockProducts = [] } = useGetLowStockProducts()

  if (productsLoading || categoriesLoading || stockInLoading || stockOutLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Loading products...</p>
      </div>
    );
  }

  if (productsError || categoriesError || stockInError || stockOutError) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-500">
          Failed to load products.
        </p>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Products",
      value: products_count?.product_count,
      icon: Package,
    },
    {
      title: "Categories",
      value: categories_count?.category_count,
      icon: Tags,
    },
    {
      title: "Stock In",
      value: stockIn_count?.stockIn_count,
      icon: ArrowDownToLine,
    },
    {
      title: "Stock Out",
      value: stockOut_count?.stockOut_count,
      icon: ArrowUpFromLine,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 md:flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 min-w-0">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b bg-white px-6">
          <div>
            <h2 className="text-lg font-semibold">Dashboard</h2>
          </div>

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
          {/* Welcome */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, Admin
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Here's what's happening with your inventory today.
            </p>
          </div>

          {/* Stats */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="rounded-xl border bg-white p-5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">{stat.title}</p>
                      <p className="mt-2 text-2xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                    </div>

                    <div className="rounded-lg bg-gray-100 p-3">
                      <Icon size={22} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Content grid */}
          <div className="mt-6 grid gap-6 xl:grid-cols-3">
            {/* Recent Transactions */}
            <div className="rounded-xl border bg-white xl:col-span-2">
              <div className="flex items-center justify-between border-b px-5 py-4">
                <div>
                  <h2 className="font-semibold">Recent Transactions</h2>
                  <p className="text-sm text-gray-500">
                    Latest inventory movements
                  </p>
                </div>

                <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
                  View all
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b bg-gray-50">
                    <tr>
                      <th className="px-5 py-3 font-medium text-gray-500">
                        Product
                      </th>
                      <th className="px-5 py-3 font-medium text-gray-500">
                        Type
                      </th>
                      <th className="px-5 py-3 font-medium text-gray-500">
                        Quantity
                      </th>
                      <th className="px-5 py-3 font-medium text-gray-500">
                        Date
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentTransactions.map((transaction) => (
                      <tr
                        key={transaction.transaction_id}
                        className="border-b last:border-0"
                      >
                        <td className="px-5 py-4 font-medium">
                          {transaction.name}
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                              transaction.type === "IN"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {transaction.type}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          {transaction.quantity}
                        </td>

                        <td className="px-5 py-4 text-gray-500">
                          {formatTime(transaction.created_at)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Low Stock */}
            <div className="rounded-xl border bg-white">
              <div className="flex items-center gap-3 border-b px-5 py-4">
                <div className="rounded-lg bg-orange-100 p-2">
                  <AlertTriangle
                    size={20}
                    className="text-orange-600"
                  />
                </div>

                <div>
                  <h2 className="font-semibold">Low Stock</h2>
                  <p className="text-sm text-gray-500">
                    Products that need attention
                  </p>
                </div>
              </div>

              <div className="divide-y">
                {lowStockProducts.map((product) => (
                  <div
                    key={product.product_id}
                    className="flex items-center justify-between px-5 py-4"
                  >
                    <div>
                      <p className="text-sm font-medium">
                        {product.name}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Product #{product.product_id}
                      </p>
                    </div>

                    <span className="text-sm font-semibold text-orange-600">
                      {product.stock} left
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;