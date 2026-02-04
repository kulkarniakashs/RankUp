package com.rankup.rankup_backend.service;

import com.rankup.rankup_backend.entity.User;
import com.rankup.rankup_backend.entity.enums.CourseStatus;
import com.rankup.rankup_backend.entity.enums.UserRole;
import com.rankup.rankup_backend.dto.response.CourseResponse;
import com.rankup.rankup_backend.exception.BadRequestException;
import com.rankup.rankup_backend.repository.CourseRepository;
import com.rankup.rankup_backend.repository.EnrollmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class StudentRecommendationService {

    private final EnrollmentRepository enrollmentRepository;
    private final CourseRepository courseRepository;

    @Transactional(readOnly = true)
    public List<CourseResponse> recommend(User student, int limit) {
        if (student.getRole() != UserRole.STUDENT) {
            throw new BadRequestException("Only STUDENT can access recommendations");
        }

        // 1) What student already purchased?
        List<UUID> purchasedCourseIds = enrollmentRepository.findPurchasedCourseIds(student.getId());

        // 2) What categories student purchased from?
        List<UUID> purchasedCategoryIds = enrollmentRepository.findPurchasedCategoryIds(student.getId());

        var page = PageRequest.of(0, limit);

        // If student has purchases, recommend from those categories, excluding purchased courses
        if (!purchasedCategoryIds.isEmpty()) {
            var recommended = courseRepository.findRecommendedFromCategories(
                    CourseStatus.APPROVED,
                    purchasedCategoryIds,
                    purchasedCourseIds,
                    page
            );

            // If not enough, top up with latest approved excluding purchased + already recommended
            if (recommended.size() < limit) {
                List<UUID> alreadyRecommendedIds = recommended.stream().map(c -> c.getId()).toList();
                var topUp = courseRepository.findLatestApprovedExcluding(
                        CourseStatus.APPROVED,
                        union(purchasedCourseIds, alreadyRecommendedIds),
                        PageRequest.of(0, limit - recommended.size())
                );
                recommended.addAll(topUp);
            }

            return recommended.stream().map(CourseResponse::from).toList();
        }

        // If no purchases yet, fallback: latest approved courses
        var latest = courseRepository.findLatestApproved(CourseStatus.APPROVED, page);
        return latest.stream().map(CourseResponse::from).toList();
    }

    private List<UUID> union(List<UUID> a, List<UUID> b) {
        // small helper to avoid duplicates
        return java.util.stream.Stream.concat(a.stream(), b.stream()).distinct().toList();
    }
}
