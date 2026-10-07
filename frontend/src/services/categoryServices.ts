import type { CategoriesCount } from "../hooks/category/useGetCategoriesCount";
import { api } from "../libs/axios";
import type { Category, CategoryWithProductCount } from "../types/category";

export const getAllCategories = async () => {
  const response = await api.get<Category[]>("/categories")
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