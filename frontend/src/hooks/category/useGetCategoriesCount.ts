import { useQuery } from "@tanstack/react-query"
import { getCategoriesCount } from "../../services/categoryServices";

export type CategoriesCount = {
  category_count: number;
};

export const useGetCategoriesCount = () => {
  return useQuery<CategoriesCount>({
    queryKey: ["categories-count"],
    queryFn: getCategoriesCount,
  });
};