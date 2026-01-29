package com.rankup.rankup_backend.dto.response;

import lombok.*;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class AuthResponse {
    private String accessToken;
    private String tokenType = "Bearer";
}
