import { useNavigate, useParams } from "react-router-dom";
import { paymentSimulation } from "../../api/paymentApi";

export default function PurchaseInitiate() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Purchase</h1>
        <p className="text-gray-600 mt-2">
          This is the payment initiation page. Connect this to your payments API later.
        </p>

        <button
          onClick={async () =>{ 
            console.log(courseId);
            await paymentSimulation(courseId || "");
            navigate(`/student/course/${courseId}/success`);
            }}
          className="mt-6 w-full rounded-xl bg-linear-to-r from-green-600 to-emerald-600 text-white py-3 font-semibold hover:opacity-90 transition"
        >
          Simulate Payment Success
        </button>

        <button
          onClick={() => navigate(`/student/course/${courseId}`)}
          className="mt-3 w-full rounded-xl bg-white border py-3 font-semibold hover:bg-gray-50 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
