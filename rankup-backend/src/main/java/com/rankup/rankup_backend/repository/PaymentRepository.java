package com.rankup.rankup_backend.repository;

import com.rankup.rankup_backend.entity.Payment;
import com.rankup.rankup_backend.entity.enums.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
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

    @Query("""
        select coalesce(sum(p.amount), 0)
        from Payment p
        where p.course.teacher.id = :teacherId
          and p.status = :status
    """)
    BigDecimal sumTeacherRevenue(@Param("teacherId") UUID teacherId,
                                 @Param("status") PaymentStatus status);
}
