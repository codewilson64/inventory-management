import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteProductById } from "../../services/productServices"

export const useDeleteProductById = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteProductById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
      queryClient.invalidateQueries({ queryKey: ["categories"] })
    }
  })
}