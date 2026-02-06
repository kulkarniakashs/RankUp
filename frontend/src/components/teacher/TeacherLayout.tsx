import { Outlet } from "react-router-dom";
import { Sidebar as TeacherSidebar } from "./TeacherSidebar";
import TeacherTopbar from "./TeacherTopbar";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";

export default function TeacherLayout() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (!token) navigate("/auth/login");
  const { role } = decodeToken(token || "") as { role: String };
  if (role != "STUDENT") navigate("/auth/login");
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-green-50">
      <div className="flex">
        <TeacherSidebar />
        <div className="flex-1 min-w-0 h-screen overflow-auto">
          <TeacherTopbar />
          <main className="px-6 py-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
