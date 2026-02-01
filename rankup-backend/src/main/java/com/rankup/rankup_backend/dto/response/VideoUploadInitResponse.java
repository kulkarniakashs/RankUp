package com.rankup.rankup_backend.dto.response;

import lombok.*;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class VideoUploadInitResponse {
    private String objectKey;
    private String uploadUrl; // presigned PUT URL
}
