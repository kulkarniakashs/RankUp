import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userDetails } from "../../api/userDetails";

export default function Topbar() {
  const navigate = useNavigate();
  async function setUp() {
    const data = await userDetails();
    console.log(data?.profilePhotoKey);
    if(data) setLink(data.profilePhotoKey);
  }
  useEffect(()=>{
    setUp();
  },[])
  const[link, setLink]= useState<String | null>();
  return (
    <header className="sticky top-0 z-10 backdrop-blur-xl bg-white/50 border-b">
      <div className="px-4 md:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <input
            placeholder="Search courses..."
            className="w-55 md:w-[320px] rounded-xl border border-gray-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/student/courses")}
            className="hidden md:inline-flex rounded-xl bg-linear-to-r from-blue-600 to-purple-600 text-white px-4 py-2 text-sm font-semibold hover:opacity-90 transition"
          >
            Explore Courses
          </button>

          <button
            onClick={() => navigate("/student/profile")}
            title="Profile"
          >
          <img src={`${link ? link : "/image-removebg-preview.png"}`} alt="profile-photo" className="w-9 h-9 rounded-full bg-gray-200"></img>
          </button>
        </div>
      </div>
    </header>
  );
}
