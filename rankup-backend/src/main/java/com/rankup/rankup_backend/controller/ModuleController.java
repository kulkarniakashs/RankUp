package com.rankup.rankup_backend.controller;

import com.rankup.rankup_backend.dto.request.ModuleCreateRequest;
import com.rankup.rankup_backend.dto.response.ModuleResponse;
import com.rankup.rankup_backend.service.CurrentUserService;
import com.rankup.rankup_backend.service.ModuleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/courses/{courseId}/modules")
@RequiredArgsConstructor
public class ModuleController {

    private final ModuleService moduleService;
    private final CurrentUserService currentUserService;

    /**
     * TEACHER: Add module to own course
     */
    @PostMapping
    public ResponseEntity<ModuleResponse> createModule(
            @PathVariable UUID courseId,
            @Valid @RequestBody ModuleCreateRequest request
    ) {
        return ResponseEntity.ok(
                moduleService.teacherAddModule(
                        currentUserService.requireUser(),
                        courseId,
                        request
                )
        );
    }

    /**
     * List modules for a course (student/teacher/admin)
     */
    @GetMapping
    public ResponseEntity<List<ModuleResponse>> listModules(
            @PathVariable UUID courseId
    ) {
        return ResponseEntity.ok(
                moduleService.listModules(courseId)
        );
    }
}
