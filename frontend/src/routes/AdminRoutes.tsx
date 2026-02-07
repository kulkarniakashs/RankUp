import { Route } from "react-router-dom";
import AdminLayout from "../components/admin/AdminLayout";
import AdminPendingCourses from "../pages/admin/PendingCourses";
import AdminCourseDetails from "../pages/admin/CourseDetails";
import AdminCategories from "../pages/admin/Categories";
import TeacherProfile from "../pages/teacher/Profile";

export const AdminRoutes = (
  <Route path="/admin" element={<AdminLayout />}>
    <Route path="dashboard" element={<AdminPendingCourses />} />
    <Route path="course/:courseId" element={<AdminCourseDetails />} />
    <Route path="categories" element={<AdminCategories />} />
    <Route path="profile" element ={<TeacherProfile/>}/>
  </Route>
);
