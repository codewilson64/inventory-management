import type { ProductsCount } from "../hooks/product/useGetProductsCount";
import { api } from "../libs/axios";
import type { ProductInput } from "../schemas/product.schema";
import type { Product } from "../types/product";

export const createProduct = async (data: ProductInput)=> {
  const response = await api.post("/products", data);
  return response.data;
};

export const getAllProducts = async () => {
  const response = await api.get<Product[]>("/products")
  return response.data
}

export const getProductById = async (id: string): Promise<Product> => {
  const response = await api.get(`/products/${id}`)
  return response.data[0]
}

export const updateProductById = async (id: string, data: ProductInput) => {
  const response = await api.patch(`/products/${id}`, data)
  return response.data
} 

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
