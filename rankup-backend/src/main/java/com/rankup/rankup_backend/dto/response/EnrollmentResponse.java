package com.rankup.rankup_backend.dto.response;

import lombok.*;

import java.util.UUID;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class EnrollmentResponse {
    private UUID enrollmentId;
    private UUID courseId;
    private UUID paymentId;
    private String status;
}
