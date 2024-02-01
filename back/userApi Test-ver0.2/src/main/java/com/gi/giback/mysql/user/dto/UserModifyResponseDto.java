package com.gi.giback.mysql.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserModifyResponseDto {
    private String userName;
    private String userEmail;
    private String profileImage;
}
