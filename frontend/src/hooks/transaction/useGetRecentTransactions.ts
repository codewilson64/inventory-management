import { useQuery } from "@tanstack/react-query"
import { getRecentTransactions } from "../../services/transactionServices"

export const useGetRecentTransactions = () => {
  return useQuery({
    queryKey: ["recent-transactions"],
    queryFn: getRecentTransactions
  })
}