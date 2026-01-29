package com.rankup.rankup_backend.repository;

import com.rankup.rankup_backend.entity.VideoProgress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface VideoProgressRepository extends JpaRepository<VideoProgress, UUID> {

    Optional<VideoProgress> findByStudentIdAndVideoId(UUID studentId, UUID videoId);

    List<VideoProgress> findByStudentId(UUID studentId);
}
