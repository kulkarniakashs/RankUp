package com.rankup.rankup_backend.service;

import com.rankup.rankup_backend.dto.response.TeacherDashboard;
import com.rankup.rankup_backend.entity.User;
import com.rankup.rankup_backend.entity.enums.PaymentStatus;
import com.rankup.rankup_backend.repository.CourseRepository;
import com.rankup.rankup_backend.repository.EnrollmentRepository;
import com.rankup.rankup_backend.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class TeacherDashboardService {
    private final CourseRepository courseRepository;
    private final  EnrollmentRepository enrollmentRepository;
    private final PaymentRepository paymentRepository;
    private final  CurrentUserService currentUserService;

    public long countStudent(User teacher){
        return enrollmentRepository.countActiveEnrollmentsForTeacher(teacher.getId());
    }

    public BigDecimal totalRevenue(User teacher){
        return paymentRepository.sumTeacherRevenue(teacher.getId(), PaymentStatus.SUCCESS);
    }

    public TeacherDashboard dashboard(){
        User teacher = currentUserService.requireUser();
        BigDecimal revenue  = totalRevenue(teacher);
        long Students = countStudent(teacher);
        return new TeacherDashboard(revenue,Students);
    }
}
