import {
  Search,
  ArrowDownToLine,
  ArrowUpFromLine,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useGetTransactionsWithProduct } from "../hooks/transaction/useGetTransactionsWithProduct";
import { formatTime } from "../helper/formatTime";

function Transactions() {
  const { data: transactions = [], isLoading, isError } = useGetTransactionsWithProduct()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Loading transactions...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-500">
          Failed to load transactions.
        </p>
      </div>
    );
  }

  return (
    <div className="md:flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <main className="flex-1 min-w-0">
        {/* Header */}
        <header className="border-b bg-white px-8 py-5">
          <h2 className="text-2xl font-semibold text-gray-900">
            Transactions
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            View your inventory stock movements
          </p>
        </header>

        <div className="p-8">
          {/* Toolbar */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:w-80">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search transactions..."
                className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-gray-500"
              />
            </div>

            <button className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800">
              <ArrowDownToLine size={18} />
              New Transaction
            </button>
          </div>

          {/* Summary cards */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border bg-white p-5">
              <p className="text-sm text-gray-500">Total Transactions</p>
              <p className="mt-2 text-2xl font-semibold text-gray-900">
                125
              </p>
            </div>

            <div className="rounded-xl border bg-white p-5">
              <p className="text-sm text-gray-500">Stock In</p>
              <p className="mt-2 text-2xl font-semibold text-green-600">
                +840
              </p>
            </div>

            <div className="rounded-xl border bg-white p-5">
              <p className="text-sm text-gray-500">Stock Out</p>
              <p className="mt-2 text-2xl font-semibold text-red-600">
                -425
              </p>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-xl border bg-white">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    ID
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    Product
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    Type
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    Quantity
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {transactions.map((transaction) => (
                  <tr
                    key={transaction.transaction_id}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-sm text-gray-500">
                      #{transaction.transaction_id}
                    </td>

                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {transaction.name}
                    </td>

                    <td className="px-6 py-4">
                      {transaction.type === "IN" ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                          <ArrowDownToLine size={14} />
                          IN
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700">
                          <ArrowUpFromLine size={14} />
                          OUT
                        </span>
                      )}
                    </td>

                    <td
                      className={`px-6 py-4 text-sm font-medium ${
                        transaction.type === "IN"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.type === "IN" ? "+" : "-"}
                      {transaction.quantity}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatTime(transaction.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t px-6 py-4">
              <p className="text-sm text-gray-500">
                Showing 1 to 5 of 125 transactions
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
                  2
                </button>

                <button className="rounded-lg border px-3 py-1.5 text-sm text-gray-600">
                  3
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

export default Transactions;