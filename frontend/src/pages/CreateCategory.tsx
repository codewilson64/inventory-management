import { ArrowLeft, Tags } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { useCreateCategory } from "../hooks/category/useCreateCategory";
import { categorySchema, type TCategoryInput } from "../schemas/categorySchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function CreateCategory() {
  const navigate = useNavigate();

  const { 
    handleSubmit, 
    register,
    formState: {errors} 
  } = useForm<TCategoryInput>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    }
  });

  const { mutateAsync, isPending } = useCreateCategory()

  const onSubmit = async(data: TCategoryInput) => {
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
          <h2 className="text-lg font-semibold">Create Category</h2>

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
              onClick={() => navigate("/categories")}
              className="mb-4 flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900"
            >
              <ArrowLeft size={17} />
              Back to Categories
            </button>

            <h1 className="text-2xl font-bold text-gray-900">
              Create Category
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Add a new category to organize your products.
            </p>
          </div>

          {/* Form card */}
          <div className="max-w-3xl overflow-hidden rounded-xl border bg-white">
            {/* Card header */}
            <div className="flex items-center gap-3 border-b px-6 py-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                <Tags size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-gray-900">
                  Category Information
                </h2>

                <p className="text-sm text-gray-500">
                  Enter the details for your new category.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="p-6">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Category Name
                </label>

                <input
                  id="name"
                  type="text"
                  placeholder="Enter category name"
                  {...register("name")}
                  className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:border-gray-400 focus:ring-1 focus:ring-gray-200"
                />

                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 border-t bg-gray-50 px-6 py-4">
              <button
                type="button"
                onClick={() => navigate("/categories")}
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
                {isPending ? "Creating..." : "Create Category"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CreateCategory;