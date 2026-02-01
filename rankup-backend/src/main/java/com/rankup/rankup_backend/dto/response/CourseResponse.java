package com.rankup.rankup_backend.dto.response;

import com.rankup.rankup_backend.entity.enums.CourseStatus;
import lombok.*;

import java.math.BigDecimal;
import java.util.UUID;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class CourseResponse {
    private UUID id;
    private UUID teacherId;
    private UUID categoryId;
    private String title;
    private String description;
    private BigDecimal fee;
    private CourseStatus status;
    private String reviewComment;
}
