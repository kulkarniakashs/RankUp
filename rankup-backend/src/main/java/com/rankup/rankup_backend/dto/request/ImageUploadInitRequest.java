package com.rankup.rankup_backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.UUID;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class ImageUploadInitRequest {

    // For course thumbnail: set courseId, for profile photo: can ignore or send null
    private UUID courseId;

    @NotBlank
    private String fileName;     // e.g. thumbnail.png

    @NotBlank
    private String contentType;  // image/png or image/jpeg
}
