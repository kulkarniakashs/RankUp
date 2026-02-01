package com.rankup.dto.response;

import lombok.*;

import java.math.BigDecimal;
import java.util.UUID;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class PaymentResponse {
    private UUID paymentId;
    private UUID courseId;
    private BigDecimal amount;
    private String currency;
    private String status;
}
