package com.gi.giback.mysql.dto;

import java.util.Map;

public class NaverResponse implements OAuth2Response{

    //JSON형태의 데이터를 받을 Map타입의 변수 attribute
    private final Map<String, Object> attribute;

    //생성자
    public NaverResponse(Map<String, Object> attribute) {
        //맵형식으로 바꿔서 attribute에 넣기
        this.attribute = (Map<String, Object>) attribute.get("response");
    }

    @Override
    public String getProvider() {
        return "naver";
    }

//    @Override
//    public String getProviderId() {
//        return attribute.get("id").toString();
//    }

    @Override
    public String getEmail() {
        return attribute.get("email").toString();
    }

    @Override
    public String getName() {
        return attribute.get("name").toString();
    }

    //네이버에서는 profile_image가 key값임
    @Override
    public String getProfileImage() {
        return attribute.get("profile_image").toString();
    }
}