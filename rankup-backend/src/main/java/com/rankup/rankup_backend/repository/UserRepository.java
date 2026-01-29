package com.rankup.rankup_backend.repository;

import com.rankup.rankup_backend.entity.User;
import com.rankup.rankup_backend.entity.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    long countByRole(UserRole role);
}
