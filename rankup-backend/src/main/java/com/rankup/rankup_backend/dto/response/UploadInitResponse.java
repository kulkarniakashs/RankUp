package com.rankup.rankup_backend.dto.response;

import lombok.*;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class UploadInitResponse {
    private String objectKey;
    private String uploadUrl;
}
