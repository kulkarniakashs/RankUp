package com.rankup.rankup_backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class PaymentMarkSuccessRequest {
    @NotBlank
    private String providerRef; // paymentId/orderId from provider or mock reference
}
