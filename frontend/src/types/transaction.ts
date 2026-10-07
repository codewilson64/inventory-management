export interface Transaction {
  transaction_id: number;
  name: string;
  quantity: number;
  type: "IN" | "OUT";
  created_at: string;
}