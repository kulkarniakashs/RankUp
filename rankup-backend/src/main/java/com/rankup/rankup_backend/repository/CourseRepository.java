package com.rankup.rankup_backend.repository;

import com.rankup.rankup_backend.entity.Course;
import com.rankup.rankup_backend.entity.enums.CourseStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CourseRepository extends JpaRepository<Course, UUID> {

    List<Course> findByStatus(CourseStatus status);

    List<Course> findByCategoryIdAndStatus(UUID categoryId, CourseStatus status);

    List<Course> findByTeacherId(UUID teacherId);

    Optional<Course> findByIdAndTeacherId(UUID id, UUID teacherId);

    List<Course> findCoursesByCategoryId(UUID categoryId);

    // Recommend from purchased categories, excluding purchased courses
    @Query("""
        select c
        from Course c
        where c.status = :status
          and c.category.id in :categoryIds
          and (:excludeCourseIds is null or c.id not in :excludeCourseIds)
        order by c.createdAt desc
    """)
    List<Course> findRecommendedFromCategories(
            CourseStatus status,
            List<UUID> categoryIds,
            List<UUID> excludeCourseIds,
            Pageable pageable
    );

    // Latest approved (fallback)
    @Query("""
        select c
        from Course c
        where c.status = :status
        order by c.createdAt desc
    """)
    List<Course> findLatestApproved(CourseStatus status, Pageable pageable);

    // Latest approved excluding some ids (top-up)
    @Query("""
        select c
        from Course c
        where c.status = :status
          and (:excludeCourseIds is null or c.id not in :excludeCourseIds)
        order by c.createdAt desc
    """)
    List<Course> findLatestApprovedExcluding(
            CourseStatus status,
            List<UUID> excludeCourseIds,
            Pageable pageable
    );
}
