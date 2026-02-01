package com.rankup.rankup_backend.dto.response;

import lombok.*;

import java.util.UUID;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class VideoResponse {
    private UUID id;
    private UUID moduleId;
    private String title;
    private String description;
    private Integer durationSeconds;
    private int sortOrder;
    private String uploadStatus;
    private String processingStatus;
    private String rawObjectKey;
    private String hlsMasterKey;
    private String thumbnailKey;
}
