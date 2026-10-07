import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.number().min(0, "Price cannot be negative"),
  stock: z.number().min(0, "Stock cannot be negative"),
  category_id: z.number().min(1, "Category is required"),
});

export type TProductInput = z.input<typeof productSchema>;