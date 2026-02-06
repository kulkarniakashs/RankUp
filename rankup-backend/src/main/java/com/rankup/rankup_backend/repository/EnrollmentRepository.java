package com.rankup.rankup_backend.repository;
import com.rankup.rankup_backend.entity.Enrollment;
import com.rankup.rankup_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface EnrollmentRepository extends JpaRepository<Enrollment, UUID> {

    Optional<Enrollment> findByStudentIdAndCourseId(UUID studentId, UUID courseId);

    boolean existsByStudentIdAndCourseId(UUID studentId, UUID courseId);

    List<Enrollment> findByStudentId(UUID student);

    @Query("""
        select distinct e.course.id
        from Enrollment e
        where e.student.id = :studentId
          and e.status = 'ACTIVE'
    """)
    List<UUID> findPurchasedCourseIds(UUID studentId);

    @Query("""
        select distinct e.course.category.id
        from Enrollment e
        where e.student.id = :studentId
          and e.status = 'ACTIVE'
    """)
    List<UUID> findPurchasedCategoryIds(UUID studentId);

    @Query("""
        select count(e)
        from Enrollment e
        where e.course.teacher.id = :teacherId
          and e.status = 'ACTIVE'
    """)
    long countActiveEnrollmentsForTeacher(@Param("teacherId") UUID teacherId);
}
