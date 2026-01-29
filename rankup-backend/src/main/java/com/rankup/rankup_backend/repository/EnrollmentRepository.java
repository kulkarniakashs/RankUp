package com.rankup.rankup_backend.repository;

import com.rankup.rankup_backend.entity.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface EnrollmentRepository extends JpaRepository<Enrollment, UUID> {

    Optional<Enrollment> findByStudentIdAndCourseId(UUID studentId, UUID courseId);

    boolean existsByStudentIdAndCourseId(UUID studentId, UUID courseId);
}
