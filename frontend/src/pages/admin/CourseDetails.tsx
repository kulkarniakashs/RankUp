import { useParams } from "react-router-dom";
import type { TeacherCourse } from "../../types/course";

export default function AdminCourseDetails() {
  const { courseId } = useParams();

  // load from API
  const course: TeacherCourse = {
    id: courseId!,
    title: "Course Title",
    description: "Full course description shown here.",
    fee: 0,
    thumbnailKey: "",
    teacherName: "Teacher Name",
    teacherId: "",
    teacherProfilePhotoKey: "",
    categoryId: "",
    categoryName : "cate",
    status: "SUBMITTED",
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow overflow-hidden">
        {/* Thumbnail or default */}
        <div className="h-52 bg-linear-to-r from-blue-100 via-purple-100 to-green-100" />

        <div className="p-6 space-y-3">
          <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>

          <p className="text-gray-700">{course.description}</p>

          <div className="flex justify-between">
            <div className="text-sm text-gray-500">
              <img
                src={
                  course.teacherProfilePhotoKey
                    ? `${import.meta.env.VITE_APP_R2}/${course.teacherProfilePhotoKey}`
                    : "/teacher.png"
                }
                alt="Teacher Profile Photo"
              ></img>
              <span className="font-medium">{course.teacherName}</span>
            </div>
            <div>Category : {course.categoryName}</div>
          </div>
          <div className="flex gap-3 pt-4">
            <button className="rounded-xl bg-green-600 text-white px-6 py-2 font-semibold">
              Approve
            </button>
            <button className="rounded-xl bg-red-600 text-white px-6 py-2 font-semibold">
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
