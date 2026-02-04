import { useEffect, useState } from "react";
import StatCard from "../../components/students/StatCard";
import CourseCard from "../../components/students/CourseCard";
import EmptyState from "../../components/students/EmptyState";
import { studentApi } from "../../api/studentApi";
import { coursesApi } from "../../api/courseApi";
import type { Course } from "../../types/course";
import { Link } from "react-router-dom";

export default function StudentDashboard() {
  const [myCourses, setMyCourses] = useState<Course[]>([]);
  const [approved, setApproved] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [mine, all] = await Promise.all([
          studentApi.myCourses(),
          coursesApi.recommendtation(),
        ]);
        setMyCourses(mine);
        setApproved(all);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const recommended = approved;

  if (loading) {
    return <div className="text-gray-600">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-gray-600 mt-1">Keep learning. Your progress is waiting.</p>
        </div>
        <Link
          to="/student/courses"
          className="hidden md:inline-flex rounded-xl bg-gray-900 text-white px-4 py-2 text-sm font-semibold hover:opacity-90 transition"
        >
          View all courses
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Purchased Courses" value={myCourses.length} icon="🎓" />
        <StatCard label="Courses Available" value={approved.length + myCourses.length} icon="✨" />
        <StatCard label="Progress" value={"—"} icon="📈" />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">My Courses</h2>
          <Link to="/student/courses" className="text-sm font-semibold text-blue-700 hover:underline">
            Manage →
          </Link>
        </div>

        {myCourses.length === 0 ? (
          <EmptyState
            title="No courses purchased yet"
            subtitle="Browse approved courses and start learning today."
            action={
              <Link to="/student/courses" className="rounded-xl bg-linear-to-r from-blue-600 to-purple-600 text-white px-5 py-2 text-sm font-semibold">
                Explore courses
              </Link>
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {myCourses.slice(0, 3).map((c) => (
              <CourseCard key={c.id} course={c} purchased={true} />
            ))}
          </div>
        )}
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900">Recommended</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommended.map((c) => (
            <CourseCard key={c.id} course={c} purchased={myCourses.some(m => m.id === c.id)} />
          ))}
        </div>
      </div>
    </div>
  );
}
