import { useQuery } from "@tanstack/react-query"
import { getLowStockProducts } from "../../services/productServices"

export const useGetLowStockProducts = () => {
  return useQuery({
    queryKey: ["product", "low-stock-products"],
    queryFn: getLowStockProducts
  })
}