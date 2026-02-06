import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userDetails } from "../../api/userDetails";

export default function TeacherTopbar() {
  const navigate = useNavigate();
  const [link, setLink] = useState<string | null>(null);
  const setUpLink = async () =>{
    const user = await userDetails();
    console.log("user", user);
    if(user && user.profilePhotoKey) setLink(`${import.meta.env.VITE_APP_R2}/${user.profilePhotoKey}`);
    console.log("link", link)
  }
  useEffect(() => {
    setUpLink();
  }, []);
  return (
    <header className="sticky top-0 z-10 bg-white/60 backdrop-blur-xl border-b border-gray-200">
      <div className="px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <input
            placeholder="Search your courses..."
            className="hidden md:block w-[320px] rounded-xl border border-gray-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400 bg-white/70"
          />
        </div>

        <div className="flex items-center gap-3">
          {/* Create Course CTA */}
          <button
            onClick={() => navigate("/teacher/course/create")}
            className="hidden md:inline-flex rounded-xl bg-linear-to-r from-blue-600 to-purple-600 text-white px-4 py-2 text-sm font-semibold hover:opacity-90 transition"
          >
            + Create Course
          </button>

          {/* Notifications (future) */}
          <button
            title="Notifications"
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
          >
            🔔
          </button>

          {/* Profile Avatar */}
          <button
            onClick={() => navigate("/teacher/profile")}
          >
            <img className='w-9 h-9 rounded-full object-cover' src={link ? link : './teacher.png'} alt="Profile Photo"></img>
          </button>
        </div>
      </div>
    </header>
  );
}
