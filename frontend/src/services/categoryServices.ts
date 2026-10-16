import type { CategoriesCount } from "../hooks/category/useGetCategoriesCount";
import { api } from "../libs/axios";
import type { CategoryInput } from "../schemas/categorySchema";
import type { Category, CategoryWithProductCount } from "../types/category";

export const getAllCategories = async () => {
  const response = await api.get<Category[]>("/categories")
  return response.data
}

export const getCategoryById = async (id: string): Promise<Category> => {
  const response = await api.get(`/categories/${id}`)
  return response.data[0]
}

export const updateCategoryById = async (id: string, data: CategoryInput) => {
  const response = await api.patch(`/categories/${id}`, data)
  return response.data
}

export const getCategoryWithProductCount = async () => {
  const response = await api.get<CategoryWithProductCount[]>("/categories/with-product-count");
  return response.data;
};

export const getCategoriesCount = async () => {
  const response = await api.get<CategoriesCount>("/categories/count");
  return response.data;
};

export const createCategory = async (data: CategoryInput) => {
  const response = await api.post("/categories", data)
  return response.data
}