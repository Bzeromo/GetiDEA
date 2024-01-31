package com.gi.giback.mysql.dto;

import java.util.Collection;
import java.util.Map;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

public class CustomOAuth2User implements OAuth2User {

    private final OAuth2Response oAuth2Response;

    public CustomOAuth2User(OAuth2Response oAuth2Response){
        this.oAuth2Response = oAuth2Response;
    }

    //로그인을 진행하면 rseource 서버로부터 들어오는 데이터가 attribute에 담기게 됨.
    //근데 플랫폼마다 보내주는 데이터의 형식이 다르기에 해당 플젝에서는 따로 로직설정을 하진 않겠다.
    @Override
    public Map<String, Object> getAttributes() {
        return null;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getName() {
        return oAuth2Response.getName();
    }
}
