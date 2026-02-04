import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function StudentLayout() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-green-50">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 min-w-0 h-screen overflow-auto">
          <Topbar />
          <main className="px-4 md:px-8 py-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
