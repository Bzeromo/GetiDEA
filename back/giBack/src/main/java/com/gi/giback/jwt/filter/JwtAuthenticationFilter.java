package com.gi.giback.jwt.filter;

import com.gi.giback.jwt.service.JwtService;
import com.gi.giback.mysql.entity.UserEntity;
import com.gi.giback.mysql.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;
import java.util.List;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserService userService;

    public JwtAuthenticationFilter(JwtService jwtService, UserService userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String token = getTokenFromRequest(request);
        if (token != null && jwtService.validateToken(token)) {

            String userEmail = jwtService.getUserEmailFromToken(token);
            System.out.println(userEmail);
            List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userEmail, null, authorities); // 권한 정보 등을 추가할 수 있음
            SecurityContextHolder.getContext().setAuthentication(authentication);
            filterChain.doFilter(request, response);

        } else { // 액세스 토큰 만료되어서 리프레시 확인 필요
            System.out.println("액세스 토큰이 없습니다.");
            String refreshToken = getRefreshTokenFromRequest(request);
            if (refreshToken != null && jwtService.validateToken(refreshToken)) {
                // 리프레시 토큰이 존재하면, 새로운 액세스 토큰 발급
                UserEntity user = userService.getUserByRefreshToken(refreshToken);

                if (user != null) {

                    String newAccessToken = jwtService.createAccessToken(user.getUserEmail(), user.getUserName(), user.getProvider().toString());
                    response.setHeader("Authorization", "Bearer " + newAccessToken);
                    filterChain.doFilter(request, response);

                } else {

                    System.out.println("리프레시 토큰이 없습니다.");
                    // 리프레시 토큰에 해당하는 사용자가 없을 때
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 401 Unauthorized
                    SecurityContextHolder.clearContext(); // 사용자 로그아웃

                }
            }
        }
        filterChain.doFilter(request, response);
    }

    private String getRefreshTokenFromRequest(HttpServletRequest request) {
        String refreshToken = request.getHeader("Authorization-refresh");
        if (refreshToken != null && refreshToken.startsWith("Bearer ")) {
            return refreshToken.substring(7);
        }
        return null;
    }

    private String getTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
