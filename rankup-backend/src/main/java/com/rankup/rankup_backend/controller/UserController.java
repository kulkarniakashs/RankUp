package com.rankup.rankup_backend.controller;

import com.rankup.rankup_backend.dto.response.UserResponse;
import com.rankup.rankup_backend.entity.User;
import com.rankup.rankup_backend.service.CurrentUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/userdetails")
@RequiredArgsConstructor
public class UserController {
    private final CurrentUserService currentUserService;
    @GetMapping
    ResponseEntity<UserResponse> userDetails(){
        User user = currentUserService.requireUser();
        return ResponseEntity.ok(UserResponse.from(user));
    }
}