package com.rankup.rankup_backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class ModuleCreateRequest {

    @NotBlank
    @Size(max = 150)
    private String title;

    private String description;

    private int sortOrder = 0;
}
