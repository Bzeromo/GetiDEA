package com.gi.giback.mysql.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserDto {
    private String userEmail;
    private String userName;
    private String profileImage;

    public UserDto(String userEmail, String userName, String profileImage) {
        this.userEmail = userEmail;
        this.userName = userName;
        this.profileImage = profileImage;
    }
}
