package com.gi.giback.mysql.user.dto;

import lombok.Data;
import lombok.Getter;

@Data
public class UserUpdateDto {
    private String userEmail;
    private String userName;
    private String profileImage;
}
