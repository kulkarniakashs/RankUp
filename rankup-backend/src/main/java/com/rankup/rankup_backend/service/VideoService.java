package com.rankup.rankup_backend.service;

import com.rankup.rankup_backend.entity.Course;
import com.rankup.rankup_backend.entity.CourseModule;
import com.rankup.rankup_backend.entity.ModuleVideo;
import com.rankup.rankup_backend.entity.TranscodingJob;
import com.rankup.rankup_backend.entity.User;
import com.rankup.rankup_backend.entity.enums.*;
import com.rankup.rankup_backend.dto.request.VideoCreateRequest;
import com.rankup.rankup_backend.dto.response.VideoResponse;
import com.rankup.rankup_backend.exception.BadRequestException;
import com.rankup.rankup_backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class VideoService {
    private final EnrollmentRepository enrollmentRepository;
    private final CourseModuleRepository moduleRepository;
    private final ModuleVideoRepository videoRepository;
    private final TranscodingJobRepository transcodingJobRepository;
    private final CourseRepository courseRepository;
    /**
     * ✅ THIS METHOD CREATES THE module_videos ROW
     * It stores: title, description, sortOrder, rawObjectKey, upload/processing status.
     */
    @Transactional
    public VideoResponse teacherAddVideo(User teacher, UUID moduleId, VideoCreateRequest req) {
        if (teacher.getRole() != UserRole.TEACHER) {
            throw new BadRequestException("Only TEACHER can add videos");
        }

        CourseModule module = moduleRepository.findById(moduleId)
                .orElseThrow(() -> new BadRequestException("Module not found"));

        Course course = module.getCourse();
        if (!course.getTeacher().getId().equals(teacher.getId())) {
            throw new BadRequestException("You are not the owner of this course");
        }

        // ✅ Create DB row in module_videos
        ModuleVideo v = new ModuleVideo();
        v.setModule(module);
        v.setTitle(req.getTitle().trim());
        v.setDescription(req.getDescription());
        v.setSortOrder(req.getSortOrder());
        v.setRawObjectKey(req.getRawObjectKey());

        // statuses based on your schema/enums
        v.setUploadStatus(VideoUploadStatus.UPLOADED);      // because raw is already in R2
        v.setProcessingStatus(VideoProcessingStatus.QUEUED); // because we will transcode next

        ModuleVideo saved = videoRepository.save(v); // ✅ INSERT happens here

        // ✅ Create DB queue job in transcoding_jobs
        TranscodingJob job = new TranscodingJob();
        job.setVideo(saved);
        job.setStatus(TranscodingJobStatus.QUEUED);
        job.setAttempts(0);
        transcodingJobRepository.save(job);

        return toResponse(saved);
    }

    @Transactional(readOnly = true)
    public List<VideoResponse> listVideosInModule(UUID moduleId) {
        return videoRepository.findByModuleIdOrderBySortOrder(moduleId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @PreAuthorize("hasRole('STUDENT')")
    public VideoResponse videoDetails(UUID videoId, User student){
        ModuleVideo video = videoRepository.findById(videoId).orElseThrow(()-> new BadRequestException("Video doesn't exist by this videoID"));
        if(!enrollmentRepository.existsByStudentIdAndCourseId(student.getId(), video.getModule().getCourse().getId())){
                throw new BadRequestException("You are not Enrolled in the course");
        }
        return toResponse(video);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public VideoResponse videoDetailsForAdmin(UUID videoId, User user){
        ModuleVideo video = videoRepository.findById(videoId).orElseThrow(()-> new BadRequestException("Video doesn't exist by this videoID"));
        return toResponse(video);
    }

    @PreAuthorize("hasRole('TEACHER')")
    public VideoResponse videoDetailsForTeacher(UUID videoId, User user){
        ModuleVideo video = videoRepository.findById(videoId).orElseThrow(()-> new BadRequestException("Video doesn't exist by this videoID"));
        if(!video.getModule().getCourse().getTeacher().getId().equals(user.getId())){
            throw new BadRequestException("You are not owner of this Course");
        }
        return toResponse(video);
    }

    private VideoResponse toResponse(ModuleVideo v) {
        return new VideoResponse(
                v.getId(),
                v.getModule().getId(),
                v.getTitle(),
                v.getDescription(),
                v.getDurationSeconds(),
                v.getSortOrder(),
                v.getUploadStatus().name(),
                v.getProcessingStatus().name(),
                v.getRawObjectKey(),
                v.getHlsMasterKey(),
                v.getThumbnailKey()
        );
    }
}
