import { ArrowLeft, Receipt } from "lucide-react";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { useGetAllProducts } from "../../hooks/product/useGetAllProducts";
import { useCreateTransaction } from "../../hooks/transaction/useCreateTransaction";
import { transactionSchema, type TransactionInput } from "../../schemas/transaction.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function CreateTransaction() {
  const navigate = useNavigate();

  const { handleSubmit, register, formState: { errors } } = useForm<TransactionInput>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      product_id: 0,
      quantity: 0,
      type: "IN"
    }
  })

  const { data: products = [] } = useGetAllProducts()

  const { mutateAsync, isPending } = useCreateTransaction()

  const onSubmit = async (data: TransactionInput) => {
    try {
      await mutateAsync(data)
    } 
    catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 md:flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <main className="flex-1 min-w-0">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b bg-white px-6">
          <h2 className="text-lg font-semibold">Create Transaction</h2>

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
          <div className="mb-6">
            <button
              onClick={() => navigate("/transactions")}
              className="mb-4 flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900"
            >
              <ArrowLeft size={17} />
              Back to Transactions
            </button>

            <h1 className="text-2xl font-bold text-gray-900">
              Create Transaction
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Record a new product transaction in your inventory.
            </p>
          </div>

          {/* Form card */}
          <div className="max-w-3xl overflow-hidden rounded-xl border bg-white">
            {/* Card header */}
            <div className="flex items-center gap-3 border-b px-6 py-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                <Receipt size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-gray-900">
                  Transaction Information
                </h2>

                <p className="text-sm text-gray-500">
                  Enter the product and transaction details.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="p-6">
              <div className="grid gap-5">
                {/* Product Selection */}
                <div>
                  <label
                    htmlFor="product"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Product
                  </label>

                  <select
                    id="product"
                    {...register("product_id", { valueAsNumber: true })}
                    className="w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-200"
                  >
                    {products.map((product) => (
                      <option
                        key={product.product_id}
                        value={product.product_id}
                      >
                        {product.name}
                      </option>
                    ))}
                  </select>

                  {errors.product_id && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.product_id.message}
                    </p>
                  )}
                </div>

                {/* Quantity */}
                <div>
                  <label
                    htmlFor="quantity"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Quantity
                  </label>

                  <input
                    id="quantity"
                    type="number"
                    min="1"
                    {...register("quantity", { valueAsNumber: true })}
                    placeholder="Enter quantity"
                    className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-200"
                  />

                  {errors.quantity && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.quantity.message}
                    </p>
                  )}
                </div>

                {/* Transaction Type */}
                <div>
                  <label
                    htmlFor="type"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Transaction Type
                  </label>

                  <select
                    id="type"
                    {...register("type")}
                    className="w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-200"
                  >
                    <option value="" disabled>
                      Select transaction type
                    </option>
                    <option value="IN">Stock In</option>
                    <option value="OUT">Stock Out</option>
                  </select>

                  {errors.type && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.type.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 border-t bg-gray-50 px-6 py-4">
              <button
                type="button"
                onClick={() => navigate("/transactions")}
                className="rounded-lg border bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit(onSubmit)}
                type="submit"
                disabled={isPending}
                className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
              >
                {isPending ? "Creating..." : "Create Transaction"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CreateTransaction;