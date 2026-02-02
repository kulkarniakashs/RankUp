package com.rankup.rankup_backend.service;

import com.rankup.rankup_backend.entity.Course;
import com.rankup.rankup_backend.entity.User;
import com.rankup.rankup_backend.entity.enums.UserRole;
import com.rankup.rankup_backend.dto.request.ImageUploadInitRequest;
import com.rankup.rankup_backend.dto.request.UploadConfirmRequest;
import com.rankup.rankup_backend.dto.response.UploadInitResponse;
import com.rankup.rankup_backend.exception.BadRequestException;
import com.rankup.rankup_backend.repository.CourseRepository;
import com.rankup.rankup_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ImageUploadService {

    private final R2UploadService r2UploadService;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    // ---------- INIT: Course thumbnail ----------
    public UploadInitResponse initCourseThumbnailUpload(User teacher, ImageUploadInitRequest req) {
        if (teacher.getRole() != UserRole.TEACHER) {
            throw new BadRequestException("Only TEACHER can upload course thumbnails");
        }
        if (req.getCourseId() == null) throw new BadRequestException("courseId is required");

        r2UploadService.validateImageContentType(req.getContentType());

        Course course = courseRepository.findById(req.getCourseId())
                .orElseThrow(() -> new BadRequestException("Course not found"));

        if (!course.getTeacher().getId().equals(teacher.getId())) {
            throw new BadRequestException("You are not owner of this course");
        }

        String safeName = req.getFileName().replaceAll("[^a-zA-Z0-9._-]", "_");
        String objectKey = "thumbnails/courses/" + course.getId() + "/" + UUID.randomUUID() + "_" + safeName;

        String uploadUrl = r2UploadService.presignPutUrl(objectKey, req.getContentType());
        return new UploadInitResponse(objectKey, uploadUrl);
    }

    // ---------- CONFIRM: Course thumbnail ----------
    @Transactional
    public void confirmCourseThumbnail(User teacher, UUID courseId, UploadConfirmRequest req) {
        if (teacher.getRole() != UserRole.TEACHER) {
            throw new BadRequestException("Only TEACHER can set course thumbnail");
        }

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new BadRequestException("Course not found"));

        if (!course.getTeacher().getId().equals(teacher.getId())) {
            throw new BadRequestException("You are not owner of this course");
        }

        // Basic safety: ensure they only set keys in thumbnail prefix
        if (!req.getObjectKey().startsWith("thumbnails/courses/" + courseId + "/")) {
            throw new BadRequestException("Invalid thumbnail objectKey");
        }

        course.setThumbnailKey(req.getObjectKey());
        courseRepository.save(course);
    }

    // ---------- INIT: Profile photo ----------
    public UploadInitResponse initProfilePhotoUpload(User user, ImageUploadInitRequest req) {
        r2UploadService.validateImageContentType(req.getContentType());

        String safeName = req.getFileName().replaceAll("[^a-zA-Z0-9._-]", "_");
        String objectKey = "profiles/" + user.getId() + "/" + UUID.randomUUID() + "_" + safeName;

        String uploadUrl = r2UploadService.presignPutUrl(objectKey, req.getContentType());
        return new UploadInitResponse(objectKey, uploadUrl);
    }

    // ---------- CONFIRM: Profile photo ----------
    @Transactional
    public void confirmProfilePhoto(User user, UploadConfirmRequest req) {
        if (!req.getObjectKey().startsWith("profiles/" + user.getId() + "/")) {
            throw new BadRequestException("Invalid profile photo objectKey");
        }

        user.setProfilePhotoKey(req.getObjectKey());
        userRepository.save(user);
    }
}
