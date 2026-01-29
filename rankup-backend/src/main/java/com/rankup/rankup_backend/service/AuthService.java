package com.rankup.rankup_backend.service;

import com.rankup.rankup_backend.entity.User;
import com.rankup.rankup_backend.dto.request.*;
import com.rankup.rankup_backend.dto.response.AuthResponse;
import com.rankup.rankup_backend.repository.UserRepository;
import com.rankup.rankup_backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthResponse signup(SignupRequest req) throws BadRequestException {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new BadRequestException("Email already registered");
        }

        User user = new User();
        user.setEmail(req.getEmail().toLowerCase());
        user.setPasswordHash(passwordEncoder.encode(req.getPassword()));
        user.setFullName(req.getFullName());
        user.setRole(req.getRole());
        user.setActive(true);

        userRepository.save(user);

        String token = jwtService.generateToken(
                user.getEmail(),
                Map.of("role", user.getRole().name(), "uid", user.getId().toString())
        );
        return new AuthResponse(token, "Bearer");
    }

    public AuthResponse login(LoginRequest req) {
        org.springframework.security.core.Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail().toLowerCase(), req.getPassword())
        );

        // If authentication succeeds, token issue:
        String token = jwtService.generateToken(
                req.getEmail().toLowerCase(),
                Map.of() // you can also add role/uid here by loading user
        );
        return new AuthResponse(token, "Bearer");
    }
}
