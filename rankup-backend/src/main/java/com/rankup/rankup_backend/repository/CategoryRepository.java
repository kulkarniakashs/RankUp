package com.rankup.rankup_backend.repository;

import com.rankup.rankup_backend.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface CategoryRepository extends JpaRepository<Category, UUID> {

    Optional<Category> findBySlug(String slug);

    boolean existsBySlug(String slug);

    Optional<Object> findByNameIgnoreCase(String name);
}
