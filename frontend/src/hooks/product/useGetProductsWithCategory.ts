import { useQuery } from "@tanstack/react-query"
import { getProductsWithCategory } from "../../services/productServices"

export const useGetProductsWithCategory = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProductsWithCategory,
  })
}