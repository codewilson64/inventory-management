import type { ProductsCount } from "../hooks/product/useGetProductsCount";
import { api } from "../libs/axios";
import type { TProductInput } from "../schemas/product.schema";
import type { Product } from "../types/product";

export const getProductsWithCategory = async () => {
  const response = await api.get<Product[]>("/products/with-category");
  return response.data;
};

export const getProductsCount = async () => {
  const response = await api.get<ProductsCount>("/products/count");
  return response.data;
};

export const getLowStockProducts = async () => {
  const response = await api.get<Product[]>("products/low-stock")
  return response.data
}

export const createProduct = async (data: TProductInput)=> {
  const response = await api.post("/products", data);
  return response.data;
};