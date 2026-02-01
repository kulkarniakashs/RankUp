package com.rankup.rankup_backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class ModuleResponse {
    private UUID id;
    private UUID courseId;
    private String title;
    private String description;
    private int sortOrder;
}
