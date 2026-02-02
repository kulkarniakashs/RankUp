package com.rankup.rankup_backend.controller;

import com.rankup.rankup_backend.dto.request.UploadConfirmRequest;
import com.rankup.rankup_backend.service.CurrentUserService;
import com.rankup.rankup_backend.service.ImageUploadService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class MediaConfirmController {

    private final ImageUploadService imageUploadService;
    private final CurrentUserService currentUserService;

    // Teacher sets thumbnail after PUT upload done
    @PostMapping("/courses/{courseId}/thumbnail/confirm")
    public ResponseEntity<Void> confirmCourseThumbnail(
            @PathVariable UUID courseId,
            @Valid @RequestBody UploadConfirmRequest req
    ) {
        imageUploadService.confirmCourseThumbnail(currentUserService.requireUser(), courseId, req);
        return ResponseEntity.ok().build();
    }

    // User sets profile photo after PUT upload done
    @PostMapping("/users/me/profile-photo/confirm")
    public ResponseEntity<Void> confirmProfilePhoto(@Valid @RequestBody UploadConfirmRequest req) {
        imageUploadService.confirmProfilePhoto(currentUserService.requireUser(), req);
        return ResponseEntity.ok().build();
    }
}
