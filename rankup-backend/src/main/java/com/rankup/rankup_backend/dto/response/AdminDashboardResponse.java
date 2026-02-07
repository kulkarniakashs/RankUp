package com.rankup.rankup_backend.dto.response;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AdminDashboardResponse {
    private  long teacher;
    private  long student;
    private  long courses;
    private BigDecimal revenue;
}
