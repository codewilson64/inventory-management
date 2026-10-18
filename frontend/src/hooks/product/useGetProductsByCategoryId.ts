import { useQuery } from "@tanstack/react-query"
import { getProductsByCategoryId } from "../../services/productServices"

export const useGetProductsByCategoryId = (categoryId: string) => {
  return useQuery({
    queryKey: ["products", "by-category", categoryId],
    queryFn: () => getProductsByCategoryId(categoryId),
    enabled: !!categoryId
  })
}