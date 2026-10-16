import { useQuery } from "@tanstack/react-query"
import { getTransactionsWithProduct } from "../../services/transactionServices"

export const useGetTransactionsWithProduct = () => {
  return useQuery({
    queryKey: ["transactions", "with-product"],
    queryFn: getTransactionsWithProduct,
  })
}