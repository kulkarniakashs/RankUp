package com.rankup.rankup_backend.service;

import com.rankup.rankup_backend.entity.*;
import com.rankup.rankup_backend.entity.enums.*;
import com.rankup.rankup_backend.dto.request.*;
import com.rankup.rankup_backend.dto.response.*;
import com.rankup.rankup_backend.exception.BadRequestException;
import com.rankup.rankup_backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final CourseRepository courseRepository;

    @Transactional
    public com.rankup.dto.response.PaymentResponse initiatePayment(User student, com.rankup.dto.request.PaymentInitiateRequest req) {
        if (student.getRole() != UserRole.STUDENT) throw new BadRequestException("Only STUDENT can purchase");

        Course course = courseRepository.findById(req.getCourseId())
                .orElseThrow(() -> new BadRequestException("Course not found"));

        if (course.getStatus() != CourseStatus.APPROVED) {
            throw new BadRequestException("Only APPROVED courses can be purchased");
        }

        if (enrollmentRepository.existsByStudentIdAndCourseId(student.getId(), course.getId())) {
            throw new BadRequestException("Already enrolled in this course");
        }

        Payment p = new Payment();
        p.setStudent(student);
        p.setCourse(course);
        p.setProvider(PaymentProvider.valueOf(req.getProvider().trim().toUpperCase()));
        p.setAmount(course.getFee());
        p.setCurrency("INR");
        p.setStatus(PaymentStatus.INITIATED);

        Payment saved = paymentRepository.save(p);

        return new com.rankup.dto.response.PaymentResponse(saved.getId(), course.getId(), saved.getAmount(), saved.getCurrency(), saved.getStatus().name());
    }

    /**
     * Called after provider confirms payment success.
     * In real Razorpay/Stripe integration, this should be triggered by webhook verification.
     */
    @Transactional
    public EnrollmentResponse markPaymentSuccessAndEnroll(User student, UUID paymentId, PaymentMarkSuccessRequest req) {
        Payment p = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new BadRequestException("Payment not found"));

        if (!p.getStudent().getId().equals(student.getId())) {
            throw new BadRequestException("Payment does not belong to this student");
        }

        if (p.getStatus() == PaymentStatus.SUCCESS) {
            // idempotent: return existing enrollment
            return enrollmentRepository.findByStudentIdAndCourseId(student.getId(), p.getCourse().getId())
                    .map(e -> new EnrollmentResponse(e.getId(), e.getCourse().getId(), e.getPayment().getId(), e.getStatus().name()))
                    .orElseThrow(() -> new BadRequestException("Payment success but enrollment missing"));
        }

        if (p.getStatus() == PaymentStatus.FAILED) {
            throw new BadRequestException("Payment already failed");
        }

        p.setStatus(PaymentStatus.SUCCESS);
        p.setProviderRef(req.getProviderRef());
        Payment savedPayment = paymentRepository.save(p);

        Enrollment e = new Enrollment();
        e.setStudent(student);
        e.setCourse(savedPayment.getCourse());
        e.setPayment(savedPayment);
        e.setStatus(EnrollmentStatus.ACTIVE);

        try {
            Enrollment savedEnrollment = enrollmentRepository.save(e);
            return new EnrollmentResponse(savedEnrollment.getId(), savedEnrollment.getCourse().getId(), savedEnrollment.getPayment().getId(), savedEnrollment.getStatus().name());
        } catch (DataIntegrityViolationException ex) {
            // In case of race condition, UNIQUE(student_id, course_id) will hit here
            Enrollment existing = enrollmentRepository.findByStudentIdAndCourseId(student.getId(), savedPayment.getCourse().getId())
                    .orElseThrow(() -> new BadRequestException("Already enrolled"));
            return new EnrollmentResponse(existing.getId(), existing.getCourse().getId(), existing.getPayment().getId(), existing.getStatus().name());
        }
    }

    @Transactional
    public void markPaymentFailed(User student, UUID paymentId, String reasonOrNull) {
        Payment p = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new BadRequestException("Payment not found"));

        if (!p.getStudent().getId().equals(student.getId())) {
            throw new BadRequestException("Payment does not belong to this student");
        }

        if (p.getStatus() == PaymentStatus.SUCCESS) {
            throw new BadRequestException("Payment already successful");
        }

        p.setStatus(PaymentStatus.FAILED);
        if (reasonOrNull != null && !reasonOrNull.isBlank()) {
            p.setProviderRef("FAILED:" + reasonOrNull.trim());
        }
        paymentRepository.save(p);
    }
}
