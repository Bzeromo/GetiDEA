package com.gi.giback.config;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            .csrf((csrf) -> csrf.disable());

//        http
//            .formLogin((login) -> login.disable());
//
//        http
//            .httpBasic((basic) -> basic.disable());
//
//        http
//            .oauth2Login((oauth2) -> oauth2
//                .userInfoEndpoint((userInfoEndpointConfig) ->
//                    userInfoEndpointConfig.userService(customOAuth2UserService)));
//
//
//        http
//            .authorizeHttpRequests((auth) -> auth
//                .requestMatchers("/", "/oauth2/**", "/login/**").permitAll()
//                .anyRequest().authenticated());

        return http.build();
    }
}
