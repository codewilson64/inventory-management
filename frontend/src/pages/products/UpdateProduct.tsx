import { ArrowLeft, Package } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { useGetAllCategories } from "../../hooks/category/useGetAllCategories";
import { useGetProductById } from "../../hooks/product/useGetProductById";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useUpdateProductById } from "../../hooks/product/useUpdateProductById";
import type { ProductInput } from "../../schemas/product.schema";

function UpdateProduct() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>()

  const { handleSubmit, register, reset } = useForm<ProductInput>()

  const { data: product } = useGetProductById(id ?? "")
  const { data: categories = [] } = useGetAllCategories()

  const { mutateAsync, isPending } = useUpdateProductById()

  useEffect(() => {
    if(product) {
      reset({
        name: product.name,
        price: product.price,
        stock: product.stock,
        category_id: product.category_id
      })
    }
  }, [reset, product])

  const onSubmit = async (data: ProductInput) => {
    try {
      if (!id) return
      await mutateAsync({ id, data })
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
          <h2 className="text-lg font-semibold">Update Product</h2>

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
              onClick={() => navigate("/products")}
              className="mb-4 flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900"
            >
              <ArrowLeft size={17} />
              Back to Products
            </button>

            <h1 className="text-2xl font-bold text-gray-900">
              Update Product
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Update the details of your existing product.
            </p>
          </div>

          {/* Form card */}
          <div className="max-w-3xl overflow-hidden rounded-xl border bg-white">
            {/* Card header */}
            <div className="flex items-center gap-3 border-b px-6 py-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                <Package size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-gray-900">
                  Product Information
                </h2>

                <p className="text-sm text-gray-500">
                  Modify the product information below.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="p-6">
              <div className="grid gap-5">
                {/* Product Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Product Name
                  </label>

                  <input
                    id="name"
                    type="text"
                    {...register("name")}
                    className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-200"
                  />
                </div>

                {/* Category */}
                <div>
                  <label
                    htmlFor="category"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Category
                  </label>

                  <select
                    id="category"
                    {...register("category_id")}
                    className="w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-200"
                  >
                    {categories.map((category) => (
                      <option
                        key={category.category_id}
                        value={category.category_id}
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price + Stock */}
                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Price */}
                  <div>
                    <label
                      htmlFor="price"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Price
                    </label>

                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                        Rp
                      </span>

                      <input
                        id="price"
                        {...register("price", { valueAsNumber: true })}
                        className="w-full rounded-lg border py-2.5 pl-11 pr-4 text-sm outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-200"
                      />
                    </div>
                  </div>

                  {/* Stock */}
                  <div>
                    <label
                      htmlFor="stock"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Stock
                    </label>

                    <input
                      id="stock"
                      {...register("stock", { valueAsNumber: true })}
                      className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-200"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 border-t bg-gray-50 px-6 py-4">
              <button
                type="button"
                onClick={() => navigate("/products")}
                className="rounded-lg border bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit(onSubmit)}
                disabled={isPending}
                type="submit"
                className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
              >
                {isPending ? "Updating..." : "Update Product"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default UpdateProduct;