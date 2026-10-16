import { useQuery } from "@tanstack/react-query"
import { getCategoryById } from "../../services/categoryServices"

export const useGetCategoriesById = (categoryId: string) => {
  return useQuery({
    queryKey: ["category", "detail", categoryId],
    queryFn: () => getCategoryById(categoryId),
    enabled: !!categoryId
  })
}