import { Route } from "react-router-dom";
import StudentLayout from "../components/students/StudentLayout";
import StudentDashboard from "../pages/student/Dashboard";
import StudentCourses from "../pages/student/Courses";
import CourseDetails from "../pages/student/CourseDetails";
import Player from "../pages/Player";
import PurchaseInitiate from "../pages/student/PurchaseInitiate";
import PurchaseSuccess from "../pages/student/PurchaseSuccess";
import StudentProfile from "../pages/student/Profile";
import { videosApi } from "../api/videoApi";

export const StudentRoutes = (
  <Route path="/student" element={<StudentLayout />}>
    <Route path="dashboard" element={<StudentDashboard />} />
    <Route path="courses" element={<StudentCourses />} />
    <Route path="course/:courseId" element={<CourseDetails />} />
    <Route path="course/:courseId/player" element={<Player setVideoDetailsById={videosApi.setVideoDetailsById} />} />
    <Route path="course/:courseId/initiate" element={<PurchaseInitiate />} />
    <Route path="course/:courseId/success" element={<PurchaseSuccess />} />
    <Route path="profile" element={<StudentProfile />} />
  </Route>
);
