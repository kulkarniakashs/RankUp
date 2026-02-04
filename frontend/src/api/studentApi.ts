import { http } from "./http";
import type { Course } from "../types/course";

export const studentApi = {
  myCourses: async (): Promise<Course[]> => {
    const res = await http.get("/students/me/courses"); // implement backend
    return res.data;
  },
};
