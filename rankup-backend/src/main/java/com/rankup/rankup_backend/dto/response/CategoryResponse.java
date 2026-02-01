package com.rankup.rankup_backend.dto.response;

import lombok.*;

import java.util.UUID;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class CategoryResponse {
    private UUID id;
    private String name;
    private String slug;
}
