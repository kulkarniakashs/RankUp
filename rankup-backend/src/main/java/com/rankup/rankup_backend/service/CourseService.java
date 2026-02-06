package com.rankup.rankup_backend.service;

import com.rankup.rankup_backend.entity.*;
import com.rankup.rankup_backend.entity.enums.*;
import com.rankup.rankup_backend.dto.request.*;
import com.rankup.rankup_backend.dto.response.CourseResponse;
import com.rankup.rankup_backend.exception.BadRequestException;
import com.rankup.rankup_backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;
    private final CategoryRepository categoryRepository;
    private final CourseReviewRepository courseReviewRepository; // optional but useful

    // -------- Teacher actions --------

    @Transactional
    public CourseResponse teacherCreateCourse(User teacher, CourseCreateRequest req) {
        if (teacher.getRole() != UserRole.TEACHER) throw new BadRequestException("Only TEACHER can create course");

        Category category = categoryRepository.findById(req.getCategoryId())
                .orElseThrow(() -> new BadRequestException("Category not found"));

        Course c = new Course();
        c.setTeacher(teacher);
        c.setCategory(category);
        c.setTitle(req.getTitle().trim());
        c.setDescription(req.getDescription().trim());
        c.setFee(req.getFee());
        c.setStatus(CourseStatus.DRAFT);

        Course saved = courseRepository.save(c);
        return toResponse(saved);
    }

    @Transactional
    public CourseResponse teacherUpdateCourse(User teacher, UUID courseId, CourseUpdateRequest req) {
        Course c = courseRepository.findByIdAndTeacherId(courseId, teacher.getId())
                .orElseThrow(() -> new BadRequestException("Course not found for this teacher"));

        // allow updates only in DRAFT or REJECTED (common rule)
//        if (!(c.getStatus() == CourseStatus.DRAFT || c.getStatus() == CourseStatus.REJECTED)) {
//            throw new BadRequestException("Only DRAFT/REJECTED courses can be updated");
//        }

        Category category = categoryRepository.findById(req.getCategoryId())
                .orElseThrow(() -> new BadRequestException("Category not found"));

        c.setCategory(category);
        c.setTitle(req.getTitle().trim());
        c.setDescription(req.getDescription().trim());
        c.setFee(req.getFee());

        return toResponse(courseRepository.save(c));
    }

    @Transactional
    public CourseResponse teacherSubmitCourse(User teacher, UUID courseId, String commentOrNull) {
        Course c = courseRepository.findByIdAndTeacherId(courseId, teacher.getId())
                .orElseThrow(() -> new BadRequestException("Course not found for this teacher"));

        if (!(c.getStatus() == CourseStatus.DRAFT || c.getStatus() == CourseStatus.REJECTED)) {
            throw new BadRequestException("Only DRAFT/REJECTED courses can be submitted");
        }

        c.setStatus(CourseStatus.SUBMITTED);
        c.setReviewComment(commentOrNull);

        Course saved = courseRepository.save(c);

        // history row
        CourseReview cr = new CourseReview();
        cr.setCourse(saved);
        cr.setActor(teacher);
        cr.setAction(c.getStatus() == CourseStatus.REJECTED ? CourseReviewAction.RESUBMITTED : CourseReviewAction.SUBMITTED);
        cr.setComment(commentOrNull);
        courseReviewRepository.save(cr);

        return toResponse(saved);
    }

    // -------- Admin actions (ONLY course approval/rejection) --------

    @Transactional
    public CourseResponse adminApproveCourse(User admin, UUID courseId, String commentOrNull) {
        if (admin.getRole() != UserRole.ADMIN) throw new BadRequestException("Only ADMIN can approve courses");

        Course c = courseRepository.findById(courseId)
                .orElseThrow(() -> new BadRequestException("Course not found"));

        if (c.getStatus() != CourseStatus.SUBMITTED) {
            throw new BadRequestException("Only SUBMITTED courses can be approved");
        }

        c.setStatus(CourseStatus.APPROVED);
        c.setReviewComment(commentOrNull);
        c.setApprovedAt(OffsetDateTime.now());
        c.setApprovedBy(admin);
        c.setRejectedAt(null);
        c.setRejectedBy(null);

        Course saved = courseRepository.save(c);

        CourseReview cr = new CourseReview();
        cr.setCourse(saved);
        cr.setActor(admin);
        cr.setAction(CourseReviewAction.APPROVED);
        cr.setComment(commentOrNull);
        courseReviewRepository.save(cr);

        return toResponse(saved);
    }

    @Transactional
    public CourseResponse adminRejectCourse(User admin, UUID courseId, String commentRequired) {
        if (admin.getRole() != UserRole.ADMIN) throw new BadRequestException("Only ADMIN can reject courses");
        if (commentRequired == null || commentRequired.isBlank()) throw new BadRequestException("Rejection comment is required");

        Course c = courseRepository.findById(courseId)
                .orElseThrow(() -> new BadRequestException("Course not found"));

        if (c.getStatus() != CourseStatus.SUBMITTED) {
            throw new BadRequestException("Only SUBMITTED courses can be rejected");
        }

        c.setStatus(CourseStatus.REJECTED);
        c.setReviewComment(commentRequired);
        c.setRejectedAt(OffsetDateTime.now());
        c.setRejectedBy(admin);
        c.setApprovedAt(null);
        c.setApprovedBy(null);

        Course saved = courseRepository.save(c);

        CourseReview cr = new CourseReview();
        cr.setCourse(saved);
        cr.setActor(admin);
        cr.setAction(CourseReviewAction.REJECTED);
        cr.setComment(commentRequired);
        courseReviewRepository.save(cr);

        return toResponse(saved);
    }

    // -------- Student actions (browse only APPROVED) --------

    @Transactional(readOnly = true)
    public List<CourseResponse> listApprovedCourses(UUID categoryIdOrNull) {
        List<Course> courses = (categoryIdOrNull == null)
                ? courseRepository.findByStatus(CourseStatus.APPROVED)
                : courseRepository.findByCategoryIdAndStatus(categoryIdOrNull, CourseStatus.APPROVED);

        return courses.stream().map(this::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public List<CourseResponse> listCourseByTeacherId(UUID teacherId){
        return courseRepository.findByTeacherId(teacherId).stream().map(course -> new CourseResponse(course.getId(), course.getTeacher().getId(), course.getTeacher().getFullName(), course.getTeacher().getProfilePhotoKey(), course.getCategory().getId(),course.getCategory().getName(), course.getTitle(), course.getDescription(), course.getFee(), course.getStatus(), course.getReviewComment(), course.getThumbnailKey())).toList();
    }

    @Transactional(readOnly = true)
    public Course courseById(UUID courseId){
        return courseRepository.findById(courseId).orElseThrow(()-> new RuntimeException("Course does not exist"));
    }

    private CourseResponse toResponse(Course c) {
        return new CourseResponse(
                c.getId(),
                c.getTeacher().getId(),
                c.getTeacher().getFullName(),
                c.getTeacher().getProfilePhotoKey(),
                c.getCategory().getId(),
                c.getCategory().getName(),
                c.getTitle(),
                c.getDescription(),
                c.getFee(),
                c.getStatus(),
                c.getReviewComment(),
                c.getThumbnailKey()
        );
    }
}
