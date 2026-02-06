package com.rankup.rankup_backend.service;

import com.rankup.rankup_backend.dto.response.CourseResponse;
import com.rankup.rankup_backend.entity.Course;
import com.rankup.rankup_backend.entity.User;
import com.rankup.rankup_backend.exception.BadRequestException;
import com.rankup.rankup_backend.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TeacherCourseService {

    private final CourseRepository courseRepository;

    public CourseResponse courseDetailByTeacher(UUID courseId, User teacher){
        Course course = courseRepository.findById(courseId).orElseThrow();
        if(!course.getTeacher().getId().equals(teacher.getId())){
            throw new BadRequestException("You are authorized");
        }
        return CourseResponse.from(course);
    }
}
