import { http } from "./http";
import type { Category } from "../types/category";

export const categoryApi = {
  list: async (): Promise<Category[]> => {
    const res = await http.get("/categories/all");
    return res.data;
  },
};
