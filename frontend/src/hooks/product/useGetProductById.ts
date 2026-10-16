import { useQuery } from "@tanstack/react-query"
import { getProductById } from "../../services/productServices"

export const useGetProductById = (productId: string) => {
  return useQuery({
    queryKey: ["products", "detail", productId],
    queryFn: () => getProductById(productId),
    enabled: !!productId
  })
}