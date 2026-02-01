package com.rankup.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.UUID;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class PaymentInitiateRequest {
    @NotNull
    private UUID courseId;

    // provider chosen by client
    @NotNull
    private String provider; // RAZORPAY/STRIPE/MOCK
}
