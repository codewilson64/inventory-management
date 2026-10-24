import { useQuery } from "@tanstack/react-query"
import { searchProducts } from "../../services/productServices"

export const useSearchProducts = (name: string) => {
  return useQuery({
    queryKey: ["products", "search", name],
    queryFn: () => searchProducts(name),
    enabled: name.trim().length > 0,
  })
}