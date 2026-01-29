package com.rankup.rankup_backend.repository;

import com.rankup.rankup_backend.entity.Course;
import com.rankup.rankup_backend.entity.enums.CourseStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CourseRepository extends JpaRepository<Course, UUID> {

    List<Course> findByStatus(CourseStatus status);

    List<Course> findByCategoryIdAndStatus(UUID categoryId, CourseStatus status);

    List<Course> findByTeacherId(UUID teacherId);
}
