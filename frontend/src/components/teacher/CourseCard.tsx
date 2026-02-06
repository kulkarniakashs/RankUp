import { useNavigate } from "react-router-dom";
import type { TeacherCourse } from "../../types/course";
import StatusBadge from "./StatusBadge";
import { http } from "../../api/http";
import { useState } from "react";

export default function TeacherCourseCard({
  courseProp,
}: {
  courseProp: TeacherCourse;
}) {
  const navigate = useNavigate();
  const [course, setCourse] = useState<TeacherCourse>(courseProp);
  const hasThumbnail = Boolean(course.thumbnailKey);

  const canSubmit = course.status === "DRAFT" || course.status === "REJECTED";

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow hover:shadow-lg transition overflow-hidden">
      <div className="relative h-36">
        {hasThumbnail ? (
          <img
            src={`${import.meta.env.VITE_APP_R2}/${course.thumbnailKey}`}
            alt={course.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-r from-blue-100 via-purple-100 to-green-100" />
        )}

        <div className="absolute inset-0 bg-black/10" />

        <div className="absolute top-3 right-3">
          <StatusBadge status={course.status} />
        </div>
      </div>

      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-gray-900 text-lg line-clamp-1">
          {course.title}
        </h3>

        <p className="text-sm text-gray-600 line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Category</span>
          <span className="font-medium text-gray-700">
            {course.categoryName}
          </span>
        </div>

        <div className="pt-3 flex gap-3">
          <button
            onClick={() => navigate(`/teacher/course/${course.id}/edit`)}
            className="flex-1 rounded-xl bg-gray-900 text-white py-2 text-sm font-semibold hover:opacity-90 transition"
          >
            Edit
          </button>

          {canSubmit && (
            <button
              onClick={async () => {
                try {
                  await http.post(`/courses/${course.id}/submit`);
                  setCourse({...course, status : "SUBMITTED"});
                } catch (error) {
                  
                }
              }}
              className={`flex-1 rounded-xl py-2 text-sm font-semibold transition
              ${
                canSubmit
                  ? "bg-blue-600 text-white hover:opacity-90"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
