import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateCategoryById } from "../../services/categoryServices"
import type { CategoryInput } from "../../schemas/categorySchema"

export const useUpdateCategoryById = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: CategoryInput }) => updateCategoryById(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
    }
  })
}