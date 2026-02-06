import { http } from "./http";
import type { Course, TeacherCourse } from "../types/course";

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
  },
  byTeacherId : async(teacherId : string) : Promise<TeacherCourse[]> => {
    const res = await http.get(`/byteacherId/${teacherId}`);
    return res.data;
  }
};
