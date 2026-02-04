import { http } from "./http";
import type { Course } from "../types/course";

export const coursesApi = {
  approved: async (categoryId?: string): Promise<Course[]> => {
    const res = await http.get("/courses/approved", {
      params: categoryId ? { categoryId } : undefined,
    });
    return res.data;
  },
  recommendtation: async (): Promise<Course[]> => {
    const res = await http.get("/students/me/recommendations");
    return res.data;
  }
};
