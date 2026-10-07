import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createProduct } from "../../services/productServices"

export const useCreateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] }),
      queryClient.invalidateQueries({ queryKey: ["products-count"] })
    }
  })
}