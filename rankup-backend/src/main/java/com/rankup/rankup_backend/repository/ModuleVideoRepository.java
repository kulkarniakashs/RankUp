package com.rankup.rankup_backend.repository;

import com.rankup.rankup_backend.entity.ModuleVideo;
import com.rankup.rankup_backend.entity.enums.VideoProcessingStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ModuleVideoRepository extends JpaRepository<ModuleVideo, UUID> {

    List<ModuleVideo> findByModuleIdOrderBySortOrder(UUID moduleId);

    List<ModuleVideo> findByProcessingStatus(VideoProcessingStatus status);
}
