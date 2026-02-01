package com.rankup.rankup_backend.controller;

import com.rankup.rankup_backend.dto.request.VideoUploadInitRequest;
import com.rankup.rankup_backend.dto.response.VideoUploadInitResponse;
import com.rankup.rankup_backend.service.CurrentUserService;
import com.rankup.rankup_backend.service.VideoUploadService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/uploads")
public class UploadController {

    private final VideoUploadService videoUploadService;
    private final CurrentUserService currentUserService;

    @PostMapping("/video/init")
    public ResponseEntity<VideoUploadInitResponse> initVideoUpload(@Valid @RequestBody VideoUploadInitRequest req) {
        return ResponseEntity.ok(videoUploadService.initUpload(currentUserService.requireUser(), req));
    }
}
