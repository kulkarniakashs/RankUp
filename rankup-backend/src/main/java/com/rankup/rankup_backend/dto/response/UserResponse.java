package com.rankup.rankup_backend.dto.response;

import com.rankup.rankup_backend.entity.User;
import com.rankup.rankup_backend.entity.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    private String uid;
    private String email;
    private String profilePhotoKey;
    private String fullName;
    private UserRole role;

    public static UserResponse from(User user){
        return new UserResponse(user.getId().toString(), user.getEmail(), user.getProfilePhotoKey(), user.getFullName(), user.getRole());
    }
}
