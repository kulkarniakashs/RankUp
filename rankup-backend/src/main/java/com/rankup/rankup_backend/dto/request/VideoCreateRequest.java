package com.rankup.rankup_backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class VideoCreateRequest {

    @NotBlank @Size(max = 150)
    private String title;

    private String description;

    private int sortOrder = 0;

    @NotBlank
    private String rawObjectKey; // key returned from /uploads/video/init
}
