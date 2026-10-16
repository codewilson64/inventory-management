import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createTransaction } from "../../services/transactionServices"

export const useCreateTransaction = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
      queryClient.invalidateQueries({ queryKey: ["products"] })
    }
  })
}