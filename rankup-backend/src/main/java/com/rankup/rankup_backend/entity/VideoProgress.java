package com.rankup.rankup_backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(
        name = "video_progress",
        uniqueConstraints = {
                @UniqueConstraint(name = "ux_progress_student_video", columnNames = {"student_id", "video_id"})
        },
        indexes = {
                @Index(name = "ix_progress_student", columnList = "student_id"),
                @Index(name = "ix_progress_video", columnList = "video_id"),
                @Index(name = "ix_progress_student_completed", columnList = "student_id,is_completed")
        }
)
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class VideoProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "student_id", nullable = false)
    private User student;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "video_id", nullable = false)
    private ModuleVideo video;

    @Column(name = "last_position_seconds", nullable = false)
    private int lastPositionSeconds = 0;

    @Column(name = "watched_seconds", nullable = false)
    private int watchedSeconds = 0;

    @Column(name = "is_completed", nullable = false)
    private boolean isCompleted = false;

    @Column(name = "completed_at", columnDefinition = "timestamptz")
    private OffsetDateTime completedAt;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, columnDefinition = "timestamptz")
    private OffsetDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false, columnDefinition = "timestamptz")
    private OffsetDateTime updatedAt;
}
