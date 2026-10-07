import { useQuery } from "@tanstack/react-query"
import { getAllCategories } from "../../services/categoryServices"

export const useGetAllCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories
  })
}