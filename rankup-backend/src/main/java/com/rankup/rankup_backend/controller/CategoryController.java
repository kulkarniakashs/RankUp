package com.rankup.rankup_backend.controller;

import com.rankup.rankup_backend.dto.request.CategoryCreateRequest;
import com.rankup.rankup_backend.dto.response.CategoryResponse;
import com.rankup.rankup_backend.service.CategoryService;
import com.rankup.rankup_backend.service.CurrentUserService;
import jakarta.validation.Valid;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;
    private final CurrentUserService currentUserService;

    @PostMapping
    public ResponseEntity<CategoryResponse> createIfNotExists(@Valid @RequestBody CategoryCreateRequest req) {
        // if you want public category creation, pass null
        // else require logged in user:
        return ResponseEntity.ok(categoryService.createIfNotExists(req, currentUserService.requireUser()));
    }

    @GetMapping("/all")
    public ResponseEntity<List<CategoryResponse>> listCategories(){
        return ResponseEntity.ok(categoryService.listCategories());
    }
}
