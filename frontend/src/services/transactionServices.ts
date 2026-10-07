import type { StockInCount } from "../hooks/transaction/useGetStockInCount";
import type { StockOutCount } from "../hooks/transaction/useGetStockOutCount";
import { api } from "../libs/axios";
import type { Transaction } from "../types/transaction";

export const getTransactionsWithProduct = async () => {
  const response = await api.get<Transaction[]>("/transactions/with-product");
  return response.data;
};

export const getStockInCount = async () => {
  const response = await api.get<StockInCount>("/transactions/stock-in-count");
  return response.data;
};

export const getStockOutCount = async () => {
  const response = await api.get<StockOutCount>("/transactions/stock-out-count");
  return response.data;
};

export const getRecentTransactions = async () => {
  const response = await api.get<Transaction[]>("/transactions/recent")
  return response.data;
}