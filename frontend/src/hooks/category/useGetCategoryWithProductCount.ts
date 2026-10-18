import { useQuery } from "@tanstack/react-query"
import { getCategoryWithProductCount } from "../../services/categoryServices"

export const useGetCategoryWithProductCount = () => {
    return useQuery({
      queryKey: ["categories", "with-product-count"],
      queryFn: getCategoryWithProductCount
    })
}