package com.rankup.rankup_backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class CategoryCreateRequest {

    @NotBlank @Size(max = 80)
    private String name;

    // If you want client to send slug. If not, we auto-generate in service.
    @Size(max = 100)
    private String slug;
}
