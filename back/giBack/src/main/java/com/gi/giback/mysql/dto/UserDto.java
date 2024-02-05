package com.gi.giback.mysql.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserDto {
    private String uesrEmail;
    private String uesrName;
    private String profileImage;

    public UserDto(String uesrEmail, String uesrName, String profileImage) {
        this.uesrEmail = uesrEmail;
        this.uesrName = uesrName;
        this.profileImage = profileImage;
    }
}
