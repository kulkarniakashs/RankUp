import { http } from "../../api/http";
import { useEffect, useState } from "react";
import { CourseCard } from "../../components/admin/CourseCard";
import type { TeacherCourse } from "../../types/course";
import type { CourseStatus } from "../../components/admin/StatusTabs";
import CourseStatusTabs from "../../components/admin/StatusTabs";
import { coursesApi } from "../../api/courseApi";
import StatCard from "../../components/students/StatCard";
import axios from "axios";

export default function AdminPendingCourses() {
    const [dashboard, setDash] = useState<{teacher : number, student : number , revenue : number, courses : number}| null>(null);
  const [courses, setCourses] = useState<TeacherCourse[]>();
  const [status, setStatus] = useState<CourseStatus>("PENDING");
  async function fetchCourses() {
    const res = await http.get("/admin/pending");
    setCourses(res.data);
    switch (status) {
      case "APPROVED": {
        const res = await coursesApi.approved();
        setCourses(res as TeacherCourse[]);
        break;
      }
      case "PENDING": {
        const res = await http.get("/admin/pending");
        setCourses(res.data);
        break;
      }
      case "REJECTED": {
        const res = await http.get("/admin/rejected");
        setCourses(res.data);
        break;
      }
    }
    console.log(res.data);
  }

 async function fetchDashboard() {
    let res = await http.get('/admin/dashboard');
    console.log(res.data);
    setDash(res.data);
 }

  useEffect(()=>{
    fetchDashboard();
  },[]);

  useEffect(() => {
    fetchCourses();
  }, [status]);

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-gray-600 mt-1">Admin role</p>
        </div>
      </div>

      {dashboard && <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Teachers" value={dashboard.teacher} icon="🎓" />
        <StatCard label="Student" value={dashboard.student}/>
        <StatCard label="Courses Available" value={dashboard.courses} icon="✨" />
        <StatCard label="Revenue" value={dashboard.revenue} icon="📈" />
      </div>}
      <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
      <CourseStatusTabs
        value={status}
        onChange={(status) => {
          setStatus(status);
        }}
      />
      {courses && courses?.length == 0 ? (
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow p-8 text-center text-gray-600">
          No courses with {status.toLowerCase()} status🎉
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {courses &&
            courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
        </div>
      )}
    </div>
  );
}
