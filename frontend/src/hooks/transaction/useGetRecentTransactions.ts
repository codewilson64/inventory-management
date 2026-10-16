import { useQuery } from "@tanstack/react-query"
import { getRecentTransactions } from "../../services/transactionServices"

export const useGetRecentTransactions = () => {
  return useQuery({
    queryKey: ["transactions", "recent-transactions"],
    queryFn: getRecentTransactions
  })
}