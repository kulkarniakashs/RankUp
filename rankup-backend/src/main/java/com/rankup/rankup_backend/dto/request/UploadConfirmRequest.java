package com.rankup.rankup_backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class UploadConfirmRequest {
    @NotBlank
    private String objectKey;
}
