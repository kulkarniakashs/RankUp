package com.rankup.rankup_backend.repository;

import com.rankup.rankup_backend.entity.Payment;
import com.rankup.rankup_backend.entity.enums.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface PaymentRepository extends JpaRepository<Payment, UUID> {

    List<Payment> findByStudentIdOrderByCreatedAtDesc(UUID studentId);

    List<Payment> findByCourseId(UUID courseId);

    boolean existsByCourseIdAndStudentIdAndStatus(
            UUID courseId,
            UUID studentId,
            PaymentStatus status
    );
}
