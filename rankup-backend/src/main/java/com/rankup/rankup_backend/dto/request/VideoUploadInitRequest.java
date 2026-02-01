package com.rankup.rankup_backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.UUID;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class VideoUploadInitRequest {
    @NotNull
    private UUID moduleId;

    @NotBlank
    private String fileName;     // original name

    @NotBlank
    private String contentType;  // video/mp4
}
