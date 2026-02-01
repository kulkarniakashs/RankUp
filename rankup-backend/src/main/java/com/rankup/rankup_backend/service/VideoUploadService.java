package com.rankup.rankup_backend.service;

import com.rankup.rankup_backend.entity.Course;
import com.rankup.rankup_backend.entity.CourseModule;
import com.rankup.rankup_backend.entity.User;
import com.rankup.rankup_backend.entity.enums.UserRole;
import com.rankup.rankup_backend.dto.request.VideoUploadInitRequest;
import com.rankup.rankup_backend.dto.response.VideoUploadInitResponse;
import com.rankup.rankup_backend.exception.BadRequestException;
import com.rankup.rankup_backend.repository.CourseModuleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class VideoUploadService {

    private final CourseModuleRepository moduleRepository;
    private final R2UploadService r2UploadService;

    public VideoUploadInitResponse initUpload(User teacher, VideoUploadInitRequest req) {
        if (teacher.getRole() != UserRole.TEACHER) throw new BadRequestException("Only TEACHER can upload videos");

        CourseModule module = moduleRepository.findById(req.getModuleId())
                .orElseThrow(() -> new BadRequestException("Module not found"));

        Course course = module.getCourse();
        if (!course.getTeacher().getId().equals(teacher.getId())) {
            throw new BadRequestException("You are not the owner of this course");
        }

        // objectKey format (choose any)
        String safeName = req.getFileName().replaceAll("[^a-zA-Z0-9._-]", "_");
        String objectKey = "raw/" + course.getId() + "/" + module.getId() + "/" + UUID.randomUUID() + "_" + safeName;

        String uploadUrl = r2UploadService.presignPutUrl(objectKey, req.getContentType());

        return new VideoUploadInitResponse(objectKey, uploadUrl);
    }
}
