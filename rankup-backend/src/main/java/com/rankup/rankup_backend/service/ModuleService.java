package com.rankup.rankup_backend.service;

import com.rankup.rankup_backend.entity.Course;
import com.rankup.rankup_backend.entity.CourseModule;
import com.rankup.rankup_backend.entity.User;
import com.rankup.rankup_backend.entity.enums.UserRole;
import com.rankup.rankup_backend.dto.request.ModuleCreateRequest;
import com.rankup.rankup_backend.dto.response.ModuleResponse;
import com.rankup.rankup_backend.exception.BadRequestException;
import com.rankup.rankup_backend.repository.CourseModuleRepository;
import com.rankup.rankup_backend.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ModuleService {

    private final CourseRepository courseRepository;
    private final CourseModuleRepository moduleRepository;

    /**
     * Teacher adds module to their own course.
     */
    @Transactional
    public ModuleResponse teacherAddModule(User teacher, UUID courseId, ModuleCreateRequest req) {

        if (teacher.getRole() != UserRole.TEACHER) {
            throw new BadRequestException("Only TEACHER can add modules");
        }

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new BadRequestException("Course not found"));

        if (!course.getTeacher().getId().equals(teacher.getId())) {
            throw new BadRequestException("You are not the owner of this course");
        }

        CourseModule module = new CourseModule();
        module.setCourse(course);
        module.setTitle(req.getTitle().trim());
        module.setDescription(req.getDescription());
        module.setSortOrder(req.getSortOrder());

        CourseModule saved = moduleRepository.save(module);

        return toResponse(saved);
    }

    /**
     * List all modules by course, sorted.
     */
    @Transactional(readOnly = true)
    public List<ModuleResponse> listModules(UUID courseId) {
        return moduleRepository.findByCourseIdOrderBySortOrder(courseId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private ModuleResponse toResponse(CourseModule m) {
        return new ModuleResponse(
                m.getId(),
                m.getCourse().getId(),
                m.getTitle(),
                m.getDescription(),
                m.getSortOrder()
        );
    }
}
