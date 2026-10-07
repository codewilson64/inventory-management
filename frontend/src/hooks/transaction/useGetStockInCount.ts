import { useQuery } from "@tanstack/react-query"
import { getStockInCount } from "../../services/transactionServices"

export type StockInCount = {
  stockIn_count: number;
};

export const useGetStockInCount = () => {
  return useQuery<StockInCount>({
    queryKey: ["stock-in-count"],
    queryFn: getStockInCount
  })
}