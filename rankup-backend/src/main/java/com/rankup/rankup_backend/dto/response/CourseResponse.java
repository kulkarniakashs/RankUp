package com.rankup.rankup_backend.dto.response;

import com.rankup.rankup_backend.entity.enums.CourseStatus;
import com.rankup.rankup_backend.entity.Course;
import lombok.*;

import java.math.BigDecimal;
import java.util.UUID;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class CourseResponse {
    private UUID id;
    private UUID teacherId;
    private String teacherName;
    private String teacherProfilePhotoKey;
    private UUID categoryId;
    private String categoryName;
    private String title;
    private String description;
    private BigDecimal fee;
    private CourseStatus status;
    private String reviewComment;
    private String thumbnailKey;

    public static CourseResponse from(Course course) {
        return new CourseResponse(
                course.getId(),
                course.getTeacher().getId(),
                course.getTeacher().getFullName(),
                course.getTeacher().getProfilePhotoKey(),
                course.getCategory().getId(),
                course.getCategory().getName(),
                course.getTitle(),
                course.getDescription(),
                course.getFee(),
                course.getStatus(),
                course.getReviewComment(),
                course.getThumbnailKey()
        );
    }
}
