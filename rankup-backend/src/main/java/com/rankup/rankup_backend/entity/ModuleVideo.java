package com.rankup.rankup_backend.entity;

import com.rankup.rankup_backend.entity.enums.VideoProcessingStatus;
import com.rankup.rankup_backend.entity.enums.VideoUploadStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(
        name = "module_videos",
        indexes = {
                @Index(name = "ix_videos_module", columnList = "module_id,sort_order"),
                @Index(name = "ix_videos_processing", columnList = "processing_status")
        }
)
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class ModuleVideo {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "module_id", nullable = false)
    private CourseModule module;

    @Column(length = 150, nullable = false)
    private String title;

    @Column(columnDefinition = "text")
    private String description;

    @Column(name = "duration_seconds")
    private Integer durationSeconds;

    @Column(name = "sort_order", nullable = false)
    private int sortOrder = 0;

    @Enumerated(EnumType.STRING)
    @Column(name = "upload_status", length = 20, nullable = false)
    private VideoUploadStatus uploadStatus;

    @Enumerated(EnumType.STRING)
    @Column(name = "processing_status", length = 20, nullable = false)
    private VideoProcessingStatus processingStatus;

    @Column(name = "raw_object_key", length = 512, nullable = false)
    private String rawObjectKey;

    @Column(name = "hls_master_key", length = 512)
    private String hlsMasterKey;

    @Column(name = "thumbnail_key", length = 512)
    private String thumbnailKey;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, columnDefinition = "timestamptz")
    private OffsetDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false, columnDefinition = "timestamptz")
    private OffsetDateTime updatedAt;
}
