import { useEffect, useState } from "react";
import StatCard from "../../components/teacher/StatCard";
import type { TeacherCourse } from "../../types/course";
import { http } from "../../api/http";
import CourseCard from "../../components/teacher/CourseCard";

export default function TeacherDashboard() {
  const [courses, setCourses] = useState<TeacherCourse[] | null>();

  async function fetchCourses() {
    const res = await http.get("teacher/courses");
    setCourses(res.data);
  }

  useEffect(() => {
    fetchCourses();
  }, []);
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome, Teacher 👋</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard label="Total Courses" value="5" />
        <StatCard label="Approved" value="3" />
        <StatCard label="Students" value="120" />
        {/* <StatCard label="Revenue" value="₹12,500" /> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {courses && courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
          />
        ))}
      </div>
    </div>
  );
}
