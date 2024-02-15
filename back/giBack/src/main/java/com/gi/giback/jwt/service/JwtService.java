package com.gi.giback.jwt.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import java.util.Date;
import javax.crypto.SecretKey;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class JwtService {
    private final SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS512);

    @Value("${jwt.access.expiration}")
    private int jwtExpirationMs;

    @Value("${jwt.refresh.expiration}")
    private int jwtRefreshExpirationMs;

    public String createAccessToken(String userEmail, String userName, String provider) {
        return Jwts.builder()
                .setSubject(userEmail)
                .setIssuedAt(new Date())
                .claim("userName", userName)
                .claim("provider", provider)
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }

    public String createRefreshToken(String userEmail, String provider) {
        return Jwts.builder()
                .setSubject(userEmail)
                .setIssuedAt(new Date())
                .claim("provider", provider)
                .setExpiration(new Date(System.currentTimeMillis() + jwtRefreshExpirationMs))
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parserBuilder()
                    .setSigningKey(key) // 검증에 사용할 서명 키 설정
                    .build()
                    .parseClaimsJws(token);
            return !claims.getBody().getExpiration().before(new Date()); // 토큰 만료 날짜가 현재 날짜보다 이후인지 확인
        } catch (SignatureException ex) {
            return false;
        }
    }
    public String getUserEmailFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key) // 파싱에 사용할 서명 키 설정
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject(); // 'sub' 클레임에 해당하는 사용자 이메일 반환
    }

}
