import { Route } from "react-router-dom";
import TeacherLayout from "../components/teacher/TeacherLayout";
import TeacherDashboard from "../pages/teacher/Dashboard";
import TeacherCourses from "../pages/teacher/CourseDetails";
import CreateCourse from "../pages/teacher/CreateCourse";
import TeacherRevenue from "../pages/teacher/Revenue";
import TeacherProfile from "../pages/teacher/Profile";
import TeacherCourseEdit from "../pages/teacher/CourseEdit";
import CourseMetadataEditPage from "../pages/teacher/CourseMetadataEdit";
import Player from "../pages/Player";
import { videosApi } from "../api/videoApi";

export const TeacherRoutes = (
  <Route path="/teacher" element={<TeacherLayout />}>
    <Route path="dashboard" element={<TeacherDashboard />} />
    <Route path="courses" element={<TeacherCourses />} />
    <Route path="course/create" element={<CreateCourse />} />
    <Route path="course/:courseId/edit" element={<TeacherCourseEdit/>}/>
    <Route path="course/:courseId/edit/meta" element={<CourseMetadataEditPage/>}/>
    <Route path="course/:courseId/player" element={<Player setVideoDetailsById={videosApi.setVideoDetailsByIdForTeacher} />}/>
    <Route path="revenue" element={<TeacherRevenue />} />
    <Route path="profile" element={<TeacherProfile />} />
  </Route>
);
