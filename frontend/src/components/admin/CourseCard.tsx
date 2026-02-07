import type { TeacherCourse } from "../../types/course";
import { useMemo, useState } from "react";

import Badge from "../students/Badge";
import { approve, reject } from "../../api/adminApi";

export function CourseCard({ course }: { course: TeacherCourse }) {
  const r2PublicBaseUrl = import.meta.env.VITE_APP_R2;
  const teacherPhotoUrl = useMemo(() => {
    if (!course.teacherProfilePhotoKey) return null;
    if (!r2PublicBaseUrl) return null;
    return `${r2PublicBaseUrl}/${course.teacherProfilePhotoKey}`;
  }, [course.teacherProfilePhotoKey, r2PublicBaseUrl]);
  const [visible, setVisible] = useState<Boolean>(true);
  if (!visible) return;
  return (
    <div className="text-left w-full cursor-pointer bg-white/70 backdrop-blur-xl rounded-2xl shadow hover:shadow-lg transition overflow-hidden group">
      <div className="relative h-40">
        {!course.thumbnailKey ? (
          <div className="w-full h-full bg-linear-to-r from-blue-100 via-purple-100 to-green-100" />
        ) : (
          <img
            className="w-full h-full object-cover"
            src={`${import.meta.env.VITE_APP_R2}/${course.thumbnailKey}`}
            alt={course.title}
          />
        )}

        <div className="absolute top-3 right-3">
          <Badge variant="warning">₹{course.fee}</Badge>
        </div>

        {/* subtle hover shine */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-white/10" />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-semibold text-gray-900 text-base md:text-lg line-clamp-1">
          {course.title}
        </h3>

        {/* Teacher Row */}
        <div className="mt-3 flex items-center gap-3">
          {/* Avatar */}
          <img
            src={`${teacherPhotoUrl == import.meta.env.VITE_APP_R2 ? teacherPhotoUrl : "/teacherPng.png"}`}
            alt={course.teacherName}
            className="w-9 h-9 rounded-full object-cover ring-2 ring-white shadow"
            onError={(e) => {
              // fallback if image fails
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />

          <div className="min-w-0">
            <div className="text-sm font-medium text-gray-900 line-clamp-1">
              {course.teacherName || "Teacher"}
            </div>
            <div className="text-xs text-gray-500">Instructor</div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mt-3 line-clamp-2">
          {course.description}
        </p>

        {/* CTA */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm font-semibold text-blue-700">
            View details →
          </span>

          {/* small hint */}
          <span className="text-xs text-gray-500">Status: {course.status}</span>
        </div>

        {course.status == "SUBMITTED" && (
          <div className="flex gap-3 pt-2">
            <button
              className="flex-1 rounded-xl bg-green-600 text-white py-2 text-sm font-semibold"
              onClick={() => {
                approve(course.id, setVisible);
                setVisible(false);
              }}
            >
              Approve
            </button>

            <button
              className="flex-1 rounded-xl bg-red-600 text-white py-2 text-sm font-semibold"
              onClick={() => {
                reject(course.id, setVisible);
              }}
            >
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
