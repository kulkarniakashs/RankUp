import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { coursesApi } from "../../api/courseApi";
import { studentApi } from "../../api/studentApi";
import { modulesApi } from "../../api/moduleApi";
import ModuleAccordion from "../../components/students/ModuleAccordin";
import EmptyState from "../../components/students/EmptyState";
import type { Course } from "../../types/course";
import type { Module } from "../../types/module";

export default function CourseDetails() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState<Course | null>(null);
  const [myCourses, setMyCourses] = useState<Course[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!courseId) return;
      setLoading(true);
      try {
        const [approved, mine] = await Promise.all([coursesApi.approved(), studentApi.myCourses()]);
        const found = approved.find((c) => c.id === courseId) || null;
        setCourse(found);
        setMyCourses(mine);

        const purchased = mine.some((c) => c.id === courseId);
        if (purchased) {
          const mods = await modulesApi.byCourse(courseId);
          setModules(mods);
        } else {
          setModules([]);
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [courseId]);

  const purchased = useMemo(() => !!courseId && myCourses.some((c) => c.id === courseId), [myCourses, courseId]);

  if (loading) return <div className="text-gray-600">Loading...</div>;

  if (!course) {
    return (
      <EmptyState
        title="Course not found"
        subtitle="This course might not be approved or available."
        action={
          <button
            onClick={() => navigate("/student/courses")}
            className="rounded-xl bg-gray-900 text-white px-5 py-2 text-sm font-semibold"
          >
            Back to courses
          </button>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow overflow-hidden">
        {!course.thumbnailKey ?  <div className="h-56 bg-linear-to-r from-blue-100 via-purple-100 to-green-100" />: <img className="object-cover h-56 w-full" src={`${import.meta.env.VITE_APP_R2}/${course.thumbnailKey}`} alt="thumbnail"></img>}
        <div className="p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{course.title}</h1>
          <p className="text-gray-600 mt-2">{course.description}</p>

          {!purchased ? (
            <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-white rounded-2xl border p-4">
              <div>
                <div className="text-sm text-gray-500">Course Fee</div>
                <div className="text-2xl font-bold text-gray-900">₹{course.fee}</div>
              </div>
              <button
                onClick={() => navigate(`/student/course/${courseId}/initiate`)}
                className="rounded-xl bg-linear-to-r from-blue-600 to-purple-600 text-white px-6 py-3 font-semibold hover:opacity-90 transition"
              >
                Buy Now
              </button>
            </div>
          ) : (
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => navigate(`/student/course/${courseId}/player`)}
                className="rounded-xl bg-gray-900 text-white px-5 py-2 text-sm font-semibold hover:opacity-90 transition"
              >
                Continue Learning
              </button>
              <button
                onClick={() => navigate("/student/courses")}
                className="rounded-xl bg-white border px-5 py-2 text-sm font-semibold hover:bg-gray-50 transition"
              >
                Browse More
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Modules</h2>

        {!purchased ? (
          <EmptyState
            title="Content locked"
            subtitle="Purchase the course to access modules and videos."
          />
        ) : modules.length === 0 ? (
          <EmptyState title="No modules yet" subtitle="This course content will appear here." />
        ) : (
          <div className="space-y-4">
            {modules.map((m) => (
              <ModuleAccordion key={m.id} module={m} courseId={courseId!} locked={!purchased} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
