import { useQuery } from "@tanstack/react-query"
import { getProductsCount } from "../../services/productServices"

export type ProductsCount = {
  product_count: number;
};

export const useGetProductsCount = () => {
  return useQuery<ProductsCount>({
    queryKey: ["products-count"],
    queryFn: getProductsCount,
  });
};