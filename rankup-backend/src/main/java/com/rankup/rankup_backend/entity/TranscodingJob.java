package com.rankup.rankup_backend.entity;

import com.rankup.rankup_backend.entity.enums.TranscodingJobStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(
        name = "transcoding_jobs",
        uniqueConstraints = {
                @UniqueConstraint(name = "ux_jobs_video", columnNames = {"video_id"})
        },
        indexes = {
                @Index(name = "ix_jobs_status_created", columnList = "status,created_at")
        }
)
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class TranscodingJob {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "video_id", nullable = false, unique = true)
    private ModuleVideo video;

    @Enumerated(EnumType.STRING)
    @Column(length = 20, nullable = false)
    private TranscodingJobStatus status;

    @Column(nullable = false)
    private int attempts = 0;

    @Column(name = "last_error", columnDefinition = "text")
    private String lastError;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, columnDefinition = "timestamptz")
    private OffsetDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false, columnDefinition = "timestamptz")
    private OffsetDateTime updatedAt;
}
