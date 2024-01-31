package com.gi.giback.config;

import org.springframework.context.annotation.Configuration;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http //API로 할때는 이것을 disable 시키는 것이 일반적이다.
            .csrf((csrf) -> csrf.disable());

        http
            .formLogin((login) -> login.disable());

        http
            .httpBasic((basic) -> basic.disable());

        http
            .oauth2Login((oauth2) -> oauth2
                .userInfoEndpoint((userInfoEndpointConfig) ->
                    userInfoEndpointConfig.userService(customOAuth2UserService)));


        http
            .authorizeHttpRequests((auth) -> auth
                .requestMatchers("/", "/oauth2/**", "/login/**").permitAll()
                .anyRequest().authenticated());

        return http.build();
    }
}
