package com.rankup.rankup_backend.controller;

import com.rankup.rankup_backend.dto.request.*;
import com.rankup.rankup_backend.dto.response.*;
import com.rankup.rankup_backend.service.CurrentUserService;
import com.rankup.rankup_backend.service.PaymentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;
    private final CurrentUserService currentUserService;

    @PostMapping("/initiate")
    public ResponseEntity<com.rankup.dto.response.PaymentResponse> initiate(@Valid @RequestBody com.rankup.dto.request.PaymentInitiateRequest req) {
        return ResponseEntity.ok(paymentService.initiatePayment(currentUserService.requireUser(), req));
    }

    @PostMapping("/{paymentId}/success")
    public ResponseEntity<EnrollmentResponse> success(@PathVariable UUID paymentId,
                                                      @Valid @RequestBody PaymentMarkSuccessRequest req) {
        return ResponseEntity.ok(paymentService.markPaymentSuccessAndEnroll(currentUserService.requireUser(), paymentId, req));
    }
}
