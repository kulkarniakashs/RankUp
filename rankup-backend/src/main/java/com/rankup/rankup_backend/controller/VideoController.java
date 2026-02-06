package com.rankup.rankup_backend.controller;

import com.rankup.rankup_backend.dto.request.VideoCreateRequest;
import com.rankup.rankup_backend.dto.response.VideoResponse;
import com.rankup.rankup_backend.service.CurrentUserService;
import com.rankup.rankup_backend.service.VideoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class VideoController {

    private final VideoService videoService;
    private final CurrentUserService currentUserService;

    @PreAuthorize("hasRole('TEACHER')")
    @PostMapping("/modules/{moduleId}/videos")
    public ResponseEntity<VideoResponse> createVideo(
            @PathVariable UUID moduleId,
            @Valid @RequestBody VideoCreateRequest req
    ) {
        return ResponseEntity.ok(
                videoService.teacherAddVideo(currentUserService.requireUser(), moduleId, req)
        );
    }

    @GetMapping("/modules/{moduleId}/videos")
    public ResponseEntity<List<VideoResponse>> listVideos( @PathVariable UUID moduleId) {
        System.out.println(moduleId);
        return ResponseEntity.ok(
                videoService.listVideosInModule(moduleId)
        );
    }

    @GetMapping("video-id/{videoId}")
    public ResponseEntity<VideoResponse> getVideoDetails(@PathVariable UUID videoId){
        return ResponseEntity.ok(videoService.videoDetails(videoId, currentUserService.requireUser()));
    }
}
