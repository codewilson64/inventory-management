import { useQuery } from "@tanstack/react-query"
import { getAllProducts } from "../../services/productServices"

export const useGetAllProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts
  })
}