package com.rankup.rankup_backend.controller;

import com.rankup.rankup_backend.dto.response.CourseResponse;
import com.rankup.rankup_backend.dto.response.TeacherDashboard;
import com.rankup.rankup_backend.service.CourseService;
import com.rankup.rankup_backend.service.CurrentUserService;
import com.rankup.rankup_backend.service.TeacherCourseService;
import com.rankup.rankup_backend.service.TeacherDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@PreAuthorize("hasRole('TEACHER')")
@RestController
@RequiredArgsConstructor
public class TeacherController {

    private final CurrentUserService currentUserService;
    private final CourseService courseService;
    private final TeacherDashboardService teacherDashboardService;
    private final TeacherCourseService teacherCourseService;

    @GetMapping("/teacher/courses")
    public ResponseEntity<List<CourseResponse>> listTeacherCourses(){
        UUID teacherId = currentUserService.requireUser().getId();
        return ResponseEntity.ok(courseService.listCourseByTeacherId(teacherId));
    }

    @GetMapping("teacher/course/{id}")
    public ResponseEntity<CourseResponse> courseDetails(@PathVariable UUID id){
        return ResponseEntity.ok(teacherCourseService.courseDetailByTeacher(id, currentUserService.requireUser()));
    }

    @GetMapping("teacher/dashboard")
    public ResponseEntity<TeacherDashboard> dashboard(){
        return ResponseEntity.ok(teacherDashboardService.dashboard());
    }
}
