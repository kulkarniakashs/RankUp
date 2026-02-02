package com.rankup.rankup_backend.service;

import com.rankup.rankup_backend.entity.User;
import com.rankup.rankup_backend.entity.enums.UserRole;
import com.rankup.rankup_backend.dto.response.CourseResponse;
import com.rankup.rankup_backend.exception.BadRequestException;
import com.rankup.rankup_backend.repository.EnrollmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentCourseService {

    private final EnrollmentRepository enrollmentRepository;

    @Transactional(readOnly = true)
    public List<CourseResponse> getMyCourses(User student) {

        if (student.getRole() != UserRole.STUDENT) {
            throw new BadRequestException("Only STUDENT can access this");
        }

        return enrollmentRepository.findByStudentId(student.getId())
                .stream()
                .map(enrollment -> CourseResponse.from(enrollment.getCourse()))
                .toList();
    }
}
