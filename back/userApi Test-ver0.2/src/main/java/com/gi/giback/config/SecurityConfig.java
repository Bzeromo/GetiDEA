package com.gi.giback.config;

import com.gi.giback.mysql.user.oauth.CustomOAuth2UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    //생성자 방식으로 의존성 주입
    private final CustomOAuth2UserService customOAuth2UserService;
    public SecurityConfig(CustomOAuth2UserService customOAuth2UserService) {

        this.customOAuth2UserService = customOAuth2UserService;
    }
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http    //REST API일때는 disable로 꺼두는 것이 일반적임.
            .csrf((csrf) -> csrf.disable());

        http
            .formLogin((login) -> login.disable());

        http
            .httpBasic((basic) -> basic.disable());

        http
            .oauth2Login((oauth2) -> oauth2
                .userInfoEndpoint((userInfoEndpointConfig) ->
                    userInfoEndpointConfig.userService(customOAuth2UserService)));

//        http
//            .authorizeHttpRequests((auth) -> auth
//                .requestMatchers("/", "/oauth2/**", "/login/**").permitAll()
//                .anyRequest().authenticated());

        return http.build();
    }
}

