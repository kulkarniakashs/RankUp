package com.rankup.rankup_backend.controller;

import com.rankup.rankup_backend.dto.request.ImageUploadInitRequest;
import com.rankup.rankup_backend.dto.response.UploadInitResponse;
import com.rankup.rankup_backend.service.CurrentUserService;
import com.rankup.rankup_backend.service.ImageUploadService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/uploads")
public class ImageUploadController {

    private final ImageUploadService imageUploadService;
    private final CurrentUserService currentUserService;

    // Teacher: init thumbnail upload
    @PostMapping("/course-thumbnail/init")
    public ResponseEntity<UploadInitResponse> initCourseThumbnail(@Valid @RequestBody ImageUploadInitRequest req) {
        return ResponseEntity.ok(
                imageUploadService.initCourseThumbnailUpload(currentUserService.requireUser(), req)
        );
    }

    // Any logged-in user: init profile photo upload
    @PostMapping("/profile-photo/init")
    public ResponseEntity<UploadInitResponse> initProfilePhoto(@Valid @RequestBody ImageUploadInitRequest req) {
        return ResponseEntity.ok(
                imageUploadService.initProfilePhotoUpload(currentUserService.requireUser(), req)
        );
    }
}
