package com.rankup.rankup_backend.service;

import com.rankup.rankup_backend.entity.User;
import com.rankup.rankup_backend.exception.UnauthorizedException;
import com.rankup.rankup_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CurrentUserService {

    private final UserRepository userRepository;

    public User requireUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || auth.getName() == null) throw new UnauthorizedException("Unauthorized");
        String email = auth.getName();
        return userRepository.findByEmail(email).orElseThrow(() -> new UnauthorizedException("Unauthorized"));
    }
}
