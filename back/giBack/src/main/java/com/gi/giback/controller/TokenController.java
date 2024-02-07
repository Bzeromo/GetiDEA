package com.gi.giback.controller;

import com.gi.giback.jwt.service.JwtService;
import com.gi.giback.mysql.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Collections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/token")
@Tag(name = "토큰 컨트롤러", description = "토큰 재발급 컨트롤러")
@CrossOrigin
public class TokenController {
    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserService userService; // UserService는 DB에서 사용자와 관련된 리프레시 토큰을 검증하는 로직을 포함

    @PostMapping("/refresh") // 401에러 발생시 클라이언트가 이 api 실행시켜야함
    @Operation(summary = "액세스 토큰 재발급", description = "리프레시 토큰이 만기되지 않았다면 액세스 토큰 재발급")
    public ResponseEntity<?> refreshAccessToken(HttpServletRequest request) {
        String refreshToken = request.getHeader("Authorization-refresh");
        if (refreshToken != null && jwtService.validateToken(refreshToken)) {
            String userEmail = jwtService.getUserEmailFromToken(refreshToken);

            // DB에 저장된 리프레시 토큰과 비교
            if (userService.validateRefreshToken(userEmail, refreshToken)) {
                // 새 액세스 토큰 생성
                String newAccessToken = jwtService.createAccessToken(userEmail, userService.getUserNameByEmail(userEmail), userService.getProviderByEmail(userEmail));
                HttpHeaders headers = new HttpHeaders();
                headers.set("Authorization", "Bearer " + newAccessToken);
                return ResponseEntity.ok(Collections.singletonMap("Authorization", newAccessToken));
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");
        // 이거 받으면 모달로 세션 만료 띄워주고 다시 로그인 하도록 유도
    }
    
    // 토큰 GET 요청 생성 필요
}
