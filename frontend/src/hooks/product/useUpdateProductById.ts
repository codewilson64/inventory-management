import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProductById } from "../../services/productServices"
import type { ProductInput } from "../../schemas/product.schema"

export const useUpdateProductById = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: {id: string, data: ProductInput}) => updateProductById(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
    }
  })
}