package com.rankup.rankup_backend.repository;

import com.rankup.rankup_backend.entity.CourseReview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CourseReviewRepository extends JpaRepository<CourseReview, UUID> {

    List<CourseReview> findByCourseIdOrderByCreatedAtDesc(UUID courseId);
}
