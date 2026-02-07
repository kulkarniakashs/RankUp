package com.rankup.rankup_backend.controller;

import com.rankup.rankup_backend.dto.response.AdminDashboardResponse;
import com.rankup.rankup_backend.dto.response.CourseResponse;
import com.rankup.rankup_backend.service.AdminDashboardService;
import com.rankup.rankup_backend.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final CourseService courseService;
    private final AdminDashboardService adminDashboardService;
    @GetMapping("/pending")
    @PreAuthorize("hasRole('ADMIN')")
    ResponseEntity<List<CourseResponse> > listPendingCourses(){
        return ResponseEntity.ok(courseService.listPendingCourses());
    }

    @GetMapping("/rejected")
    @PreAuthorize("hasRole('ADMIN')")
    ResponseEntity<List<CourseResponse> > listRejectedCourses(){
        return ResponseEntity.ok(courseService.listRejectedCourses());
    }


    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('ADMIN')")
    ResponseEntity<AdminDashboardResponse> dashboard(){
        return ResponseEntity.ok(adminDashboardService.dashboard());
    }
}
