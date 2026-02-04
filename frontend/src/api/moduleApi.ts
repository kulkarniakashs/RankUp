import { http } from "./http";
import type { Module } from "../types/module";

export const modulesApi = {
  byCourse: async (courseId: string): Promise<Module[]> => {
    const res = await http.get(`/courses/${courseId}/modules`);
    return res.data;
  },
};
