import { NavLink } from "react-router-dom";

const linkBase =
  "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition";

export default function AdminSidebar() {
  return (
 <aside className="hidden md:flex md:w-72 md:flex-col md:sticky md:top-0 md:h-screen p-4">
       <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow p-4 flex flex-col h-full">
         <div className="mb-6">
           <div className="text-xl font-bold text-gray-900">RankUp</div>
           <div className="text-xs text-gray-500">Admin Dashboard</div>
         </div>
 
         <nav className="space-y-2">
           <NavLink
             to="/admin/dashboard"
             className={({ isActive }) =>
               `${linkBase} ${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"}`
             }
           >
             📌 Dashboard
           </NavLink>
 
           <NavLink
             to="/admin/categories"
             className={({ isActive }) =>
               `${linkBase} ${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"}`
             }
           >
             🎓 Create Category
           </NavLink>
 
           <NavLink
             to="/admin/profile"
             className={({ isActive }) =>
               `${linkBase} ${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"}`
             }
           >
             👤 Profile
           </NavLink>
         </nav>
 
         <div className="mt-auto pt-4 border-t">
           <button
             onClick={() => {
               localStorage.removeItem("token");
               window.location.href = "/auth/login";
             }}
             className="w-full rounded-xl bg-gray-900 text-white py-2 text-sm font-semibold hover:opacity-90 transition"
           >
             Logout
           </button>
         </div>
       </div>
     </aside>
  );
}
