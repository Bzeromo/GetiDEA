package com.gi.giback.mysql.dto;

import java.util.Map;

public class GoogleResponse implements OAuth2Response{

    //JSON형태의 데이터를 받을 Map타입의 변수 attribute
    private final Map<String, Object> attribute;

    public GoogleResponse(Map<String, Object> attribute) {

        this.attribute = attribute;
    }

    @Override
    public String getProvider() {
        return "google";
    }


    @Override
    public String getEmail() {

        return attribute.get("email").toString();
    }

    @Override
    public String getName() {
        return attribute.get("name").toString();
    }

    //google에서는 가져오는 프로필에 해당하는 key가 picture임.
    @Override
    public String getProfileImage() {
        return attribute.get("picture").toString();
    }
}