package com.rankup.rankup_backend.service;

import com.rankup.rankup_backend.dto.response.AdminDashboardResponse;
import com.rankup.rankup_backend.entity.User;
import com.rankup.rankup_backend.entity.enums.CourseStatus;
import com.rankup.rankup_backend.entity.enums.UserRole;
import com.rankup.rankup_backend.repository.CourseRepository;
import com.rankup.rankup_backend.repository.PaymentRepository;
import com.rankup.rankup_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminDashboardService {
    private final UserRepository userRepository;
    private final PaymentRepository paymentRepository;
    private final CourseRepository courseRepository;

    public AdminDashboardResponse dashboard(){
       long teachers = userRepository.countByRole(UserRole.TEACHER);
        long students = userRepository.countByRole(UserRole.STUDENT);
        long courses = courseRepository.findByStatus(CourseStatus.APPROVED).size();
        BigDecimal revenue = paymentRepository.sum();
        return new AdminDashboardResponse(teachers, students, courses, revenue);
    }

}
