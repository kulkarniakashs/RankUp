import { useEffect, useState } from "react";
import type { User } from "../../types/user";
import { userDetails } from "../../api/userDetails";

export default function StudentProfile() {
  const [user, setUser] = useState<User>({fullName : "Student Name", email : "student@email.com", uid : "id",profilePhotoKey : null, role: "STUDENT" });
  async function setUpUser() {
    const data = await userDetails();
    if(data) setUser(data);
    console.log("user data", data);
  }
  useEffect(()=>{
    setUpUser();
  },[])
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600 mt-1">Manage your account information.</p>

        <div className="mt-6 flex items-center gap-4">
          <div ><img src={`${user.profilePhotoKey == null ? "/image-removebg-preview.png": import.meta.env.VITE_APP_R2 + '/' + user.profilePhotoKey}`} alt="profile Photo" className="w-16 h-16 rounded-full bg-gray-200" ></img></div>
          <div>
            <div className="font-semibold text-gray-900">{user.fullName}</div>
            <div className="text-sm text-gray-600">{user.email}</div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Full name</label>
            <input className="mt-1 w-full rounded-xl border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input disabled className="mt-1 w-full rounded-xl border px-4 py-2 bg-gray-50" />
          </div>
        </div>

        <div className="mt-5 flex gap-3">
          <button className="rounded-xl bg-gray-900 text-white px-5 py-2 text-sm font-semibold hover:opacity-90">
            Save
          </button>
          <button className="rounded-xl bg-white border px-5 py-2 text-sm font-semibold hover:bg-gray-50">
            Cancel
          </button>
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900">Profile Photo</h2>
        <p className="text-sm text-gray-600 mt-1">
          Upload a profile photo (connect to R2 presigned upload later).
        </p>

        <div className="mt-4 border-2 border-dashed rounded-2xl p-6 text-center text-gray-600">
          Drag & drop image here, or <span className="text-blue-700 font-semibold">browse</span>
        </div>
      </div>
    </div>
  );
}
