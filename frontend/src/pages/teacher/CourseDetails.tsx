import { useNavigate, useParams } from "react-router-dom";
import StatusBadge from "../../components/teacher/StatusBadge";

export default function TeacherCourseDetails() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  // later fetch from backend
  const course = {
    title: "React Mastery",
    description: "Learn React with real-world projects",
    status: "DRAFT",
    reviewComment: null,
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {course.title}
            </h1>
            <p className="mt-2 text-gray-600">{course.description}</p>
          </div>
          <StatusBadge status={course.status} />
        </div>

        {course.status === "REJECTED" && course.reviewComment && (
          <div className="mt-4 rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
            <strong>Admin feedback:</strong> {course.reviewComment}
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => navigate(`/teacher/course/${courseId}/edit`)}
            className="rounded-xl bg-gray-900 text-white px-5 py-2 text-sm font-semibold"
          >
            Edit Course
          </button>

          <button
            onClick={() => navigate(`/teacher/course/${courseId}/modules`)}
            className="rounded-xl bg-white border px-5 py-2 text-sm font-semibold hover:bg-gray-50"
          >
            Manage Modules
          </button>

          {course.status === "DRAFT" && (
            <button className="rounded-xl bg-blue-600 text-white px-5 py-2 text-sm font-semibold">
              Submit for Review
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
