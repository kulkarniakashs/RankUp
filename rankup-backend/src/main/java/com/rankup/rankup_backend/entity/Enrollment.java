package com.rankup.rankup_backend.entity;

import com.rankup.rankup_backend.entity.enums.EnrollmentStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(
        name = "enrollments",
        uniqueConstraints = {
                @UniqueConstraint(name = "ux_enrollments_student_course", columnNames = {"student_id", "course_id"})
        },
        indexes = {
                @Index(name = "ix_enrollments_student", columnList = "student_id"),
                @Index(name = "ix_enrollments_course", columnList = "course_id")
        }
)
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class Enrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "student_id", nullable = false)
    private User student;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "payment_id", nullable = false)
    private Payment payment;

    @CreationTimestamp
    @Column(name = "enrolled_at", nullable = false, columnDefinition = "timestamptz")
    private OffsetDateTime enrolledAt;

    @Enumerated(EnumType.STRING)
    @Column(length = 20, nullable = false)
    private EnrollmentStatus status = EnrollmentStatus.ACTIVE;
}
