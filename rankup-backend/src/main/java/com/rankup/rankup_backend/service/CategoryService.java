package com.rankup.rankup_backend.service;

import com.rankup.rankup_backend.entity.Category;
import com.rankup.rankup_backend.entity.User;
import com.rankup.rankup_backend.dto.request.CategoryCreateRequest;
import com.rankup.rankup_backend.dto.response.CategoryResponse;
import com.rankup.rankup_backend.exception.BadRequestException;
import com.rankup.rankup_backend.repository.CategoryRepository;
import com.rankup.rankup_backend.util.SlugUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    @Transactional
    public CategoryResponse createIfNotExists(CategoryCreateRequest req, User actorOrNull) {
        String name = req.getName().trim();
        String slug = (req.getSlug() == null || req.getSlug().isBlank())
                ? SlugUtil.toSlug(name)
                : SlugUtil.toSlug(req.getSlug());

        // 1) first try by slug (fast + primary)
        return categoryRepository.findBySlug(slug)
                .map(this::toResponse)
                .orElseGet(() -> {
                    // 2) optional: also dedupe by lower(name) uniqueness
                    categoryRepository.findByNameIgnoreCase(name)
                            .ifPresent(existing -> {
                                // If you want "return existing" instead of error:
                                // throw new BadRequestException("Category name already exists");
                                throw new BadRequestException("Category with same name already exists (case-insensitive).");
                            });

                    Category c = new Category();
                    c.setName(name);
                    c.setSlug(slug);
                    c.setCreatedBy(actorOrNull); // can be null

                    Category saved = categoryRepository.save(c);
                    return toResponse(saved);
                });
    }

    private CategoryResponse toResponse(Category c) {
        return new CategoryResponse(c.getId(), c.getName(), c.getSlug());
    }
}
