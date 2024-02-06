package com.gi.giback.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserDTO {
    private String userEmail;
    private String userName;
    private String profileImage;

    public UserDTO(String userEmail, String userName, String profileImage) {
        this.userEmail = userEmail;
        this.userName = userName;
        this.profileImage = profileImage;
    }
}
