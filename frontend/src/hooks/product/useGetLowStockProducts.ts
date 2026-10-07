import { useQuery } from "@tanstack/react-query"
import { getLowStockProducts } from "../../services/productServices"

export const useGetLowStockProducts = () => {
  return useQuery({
    queryKey: ["low-stock"],
    queryFn: getLowStockProducts
  })
}