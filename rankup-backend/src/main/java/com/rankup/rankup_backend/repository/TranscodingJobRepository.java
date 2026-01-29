package com.rankup.rankup_backend.repository;

import com.rankup.rankup_backend.entity.TranscodingJob;
import com.rankup.rankup_backend.entity.enums.TranscodingJobStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface TranscodingJobRepository extends JpaRepository<TranscodingJob, UUID> {

    List<TranscodingJob> findTop10ByStatusOrderByCreatedAt(
            TranscodingJobStatus status
    );
}
