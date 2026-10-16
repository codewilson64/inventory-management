import { z } from "zod";

export const transactionSchema = z.object({
  product_id: z.number().min(1, "Product is required"),
  quantity: z.number().min(1, "Quantity is required"),
  type: z.enum(["IN", "OUT"]),
});

export type TransactionInput = z.infer<typeof transactionSchema>;