import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProductById } from "../../services/productServices"
import type { ProductInput } from "../../schemas/product.schema"

export const useUpdateProductById = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: {id: string, data: ProductInput}) => {
      return updateProductById(id, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
    }
  })
}