import { useQuery } from "@tanstack/react-query"
import { searchTransactions } from "../../services/transactionServices"

export const useSearchTransactions = (name: string) => {
  return useQuery({
    queryKey: ["transactions", "search", name],
    queryFn: () => searchTransactions(name),
    enabled: name.trim().length > 0,
  })
}