package com.rankup.rankup_backend.dto.request;

import com.rankup.rankup_backend.entity.enums.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class SignupRequest {

    @Email @NotBlank
    private String email;

    @NotBlank @Size(min = 8, max = 72)
    private String password;

    @NotBlank @Size(max = 150)
    private String fullName;

    @NotNull
    private UserRole role; // ADMIN/TEACHER/STUDENT (you can restrict admin creation if you want)
}
