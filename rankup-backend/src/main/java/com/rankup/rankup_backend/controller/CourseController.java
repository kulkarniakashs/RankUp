package com.rankup.rankup_backend.controller;

import com.rankup.rankup_backend.dto.request.*;
import com.rankup.rankup_backend.dto.response.CourseResponse;
import com.rankup.rankup_backend.service.CourseService;
import com.rankup.rankup_backend.service.CurrentUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/courses")
public class CourseController {

    private final CourseService courseService;
    private final CurrentUserService currentUserService;

    // Student browse (only approved)
    @GetMapping("/approved")
    public ResponseEntity<List<CourseResponse>> listApproved(@RequestParam(required = false) UUID categoryId) {
        return ResponseEntity.ok(courseService.listApprovedCourses(categoryId));
    }

    @PreAuthorize("hasRole('TEACHER')")
    @PostMapping
    public ResponseEntity<CourseResponse> create(@Valid @RequestBody CourseCreateRequest req) {
        return ResponseEntity.ok(courseService.teacherCreateCourse(currentUserService.requireUser(), req));
    }

    @PreAuthorize("hasRole('TEACHER')")
    @PutMapping("/{courseId}")
    public ResponseEntity<CourseResponse> update(@PathVariable UUID courseId,@Valid @RequestBody CourseUpdateRequest req) {
        return ResponseEntity.ok(courseService.teacherUpdateCourse(currentUserService.requireUser(), courseId, req));
    }

    @PreAuthorize("hasRole('TEACHER')")
    @PostMapping("/{courseId}/submit")
    public ResponseEntity<CourseResponse> submit(@PathVariable UUID courseId, @RequestBody(required = false) CourseReviewRequest req) {
        String comment = (req == null) ? null : req.getComment();
        return ResponseEntity.ok(courseService.teacherSubmitCourse(currentUserService.requireUser(), courseId, comment));
    }

    // Admin approve
    @PostMapping("/{courseId}/approve")
    public ResponseEntity<CourseResponse> approve(@PathVariable UUID courseId, @RequestBody(required = false) CourseReviewRequest req) {
        String comment = (req == null) ? null : req.getComment();
        return ResponseEntity.ok(courseService.adminApproveCourse(currentUserService.requireUser(), courseId, comment));
    }

    // Admin reject (comment required)
    @PostMapping("/{courseId}/reject")
    public ResponseEntity<CourseResponse> reject(@PathVariable UUID courseId, @Valid @RequestBody CourseReviewRequest req) {
        return ResponseEntity.ok(courseService.adminRejectCourse(currentUserService.requireUser(), courseId, req.getComment()));
    }

    @GetMapping("/byteacherId/{teacherId}")
    @PreAuthorize("hasAnyRole('STUDENT', 'ADMIN', 'TEACHER')")
    public ResponseEntity<List<CourseResponse>> coursesByTeacherId (@PathVariable UUID teacherId){
        return ResponseEntity.ok(courseService.listCourseByTeacherId(teacherId));
    }
}
