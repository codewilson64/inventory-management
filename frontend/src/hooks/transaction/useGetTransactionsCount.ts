import { useQuery } from "@tanstack/react-query"
import { getTransactionsCount } from "../../services/transactionServices"

export type TransactionCount = {
  transaction_count: number
}

export const useGetTransactionsCount = () => {
  return useQuery<TransactionCount>({
    queryKey: ["transactions", "count"],
    queryFn: getTransactionsCount
  })
}