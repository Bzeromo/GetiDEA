package com.gi.giback.mysql.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
// lombok으로 Getter, Setter 생성
public class UserDto { // User DTO

    private String userId;

    private String userName;

    private String userEmail;

    private String profileImg;

    private String provider;

    private String accessToken;

    private boolean isAdmin;

}
