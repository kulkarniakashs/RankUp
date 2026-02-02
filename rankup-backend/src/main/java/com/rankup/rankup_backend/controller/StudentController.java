package com.rankup.rankup_backend.controller;

import com.rankup.rankup_backend.dto.response.CourseResponse;
import com.rankup.rankup_backend.service.CurrentUserService;
import com.rankup.rankup_backend.service.StudentCourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/students/me")
public class StudentController {

    private final StudentCourseService studentCourseService;
    private final CurrentUserService currentUserService;

    /**
     * List courses purchased by logged-in student
     */
    @GetMapping("/courses")
    public ResponseEntity<List<CourseResponse>> myCourses() {
        return ResponseEntity.ok(
                studentCourseService.getMyCourses(currentUserService.requireUser())
        );
    }
}
