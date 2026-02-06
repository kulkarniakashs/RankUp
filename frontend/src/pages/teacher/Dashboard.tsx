import { useEffect, useState } from "react";
import StatCard from "../../components/teacher/StatCard";
import type { TeacherCourse } from "../../types/course";
import { http } from "../../api/http";
import CourseCard from "../../components/teacher/CourseCard";

export default function TeacherDashboard() {
  const [courses, setCourses] = useState<TeacherCourse[] | null>();
  const [dashBoard, setDashboard] = useState<{
    total?: number;
    approved?: number;
    students?: number;
    rev?: number;
  } | undefined>();
  async function fetchCourses() {
    const res = await http.get("teacher/courses");
    setCourses(res.data);
    let arr : TeacherCourse[] = res.data;
    let total = arr.length;
    let approved =0;
    arr.forEach((val) => {
      if(val.status == 'APPROVED') approved++;
    })
    let dash = await http.get('/teacher/dashboard');
    setDashboard({...dashBoard,rev: dash.data.revenue, students : dash.data.students, total : total, approved : approved});
  }

  useEffect(() => {
    fetchCourses();
  }, []);
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome, Teacher 👋</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {dashBoard?.total && <StatCard label="Total Courses" value={dashBoard.total.toString()} />}
        {dashBoard?.approved && <StatCard label="Approved" value={dashBoard.approved.toString()} />}
        {dashBoard?.students && <StatCard label="Students" value={dashBoard.students.toString()} /> }
        {dashBoard?.rev && <StatCard label="Revenue" value={dashBoard.rev.toString()} />}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {courses &&
          courses.map((course) => (
            <CourseCard key={course.id} courseProp={course} />
          ))}
      </div>
    </div>
  );
}
