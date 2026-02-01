package com.rankup.rankup_backend.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.UUID;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class CourseCreateRequest {

    @NotNull
    private UUID categoryId;

    @NotBlank @Size(max = 150)
    private String title;

    @NotBlank
    private String description;

    @NotNull @DecimalMin(value = "0.0", inclusive = true)
    private BigDecimal fee;
}
