import { useQuery } from "@tanstack/react-query"
import { getStockOutCount } from "../../services/transactionServices"

export type StockOutCount = {
  stockOut_count: number;
};

export const useGetStockOutCount = () => {
  return useQuery<StockOutCount>({
    queryKey: ["stock-out-count"],
    queryFn: getStockOutCount
  })
}