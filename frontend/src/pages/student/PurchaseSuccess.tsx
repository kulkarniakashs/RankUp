import { useNavigate, useParams } from "react-router-dom";

export default function PurchaseSuccess() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow p-6 text-center">
        <div className="text-3xl">🎉</div>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Payment Successful</h1>
        <p className="text-gray-600 mt-2">
          You now have access to the course content.
        </p>

        <button
          onClick={() => navigate(`/student/course/${courseId}`)}
          className="mt-6 w-full rounded-xl bg-gray-900 text-white py-3 font-semibold hover:opacity-90 transition"
        >
          Go to Course
        </button>

        <button
          onClick={() => navigate(`/student/courses`)}
          className="mt-3 w-full rounded-xl bg-white border py-3 font-semibold hover:bg-gray-50 transition"
        >
          Explore More Courses
        </button>
      </div>
    </div>
  );
}
