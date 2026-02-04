package com.rankup.rankup_backend.controller;

import com.rankup.rankup_backend.dto.response.CourseResponse;
import com.rankup.rankup_backend.service.CurrentUserService;
import com.rankup.rankup_backend.service.StudentCourseService;
import com.rankup.rankup_backend.service.StudentRecommendationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@PreAuthorize("hasRole('STUDENT')")
@RequestMapping("/students/me")
public class StudentController {

    private final StudentCourseService studentCourseService;
    private final CurrentUserService currentUserService;
    private final StudentRecommendationService recommendationService;
    /**
     * List courses purchased by logged-in student
     */
    @GetMapping("/courses")
    public ResponseEntity<List<CourseResponse>> myCourses() {
        return ResponseEntity.ok(
                studentCourseService.getMyCourses(currentUserService.requireUser())
        );
    }

    @GetMapping("/recommendations")
    public ResponseEntity<List<CourseResponse>> recommendations(
            @RequestParam(required = false, defaultValue = "6") int limit
    ) {
        // hard cap
        int safeLimit = Math.min(Math.max(limit, 1), 6);

        return ResponseEntity.ok(
                recommendationService.recommend(currentUserService.requireUser(), safeLimit)
        );
    }
}
