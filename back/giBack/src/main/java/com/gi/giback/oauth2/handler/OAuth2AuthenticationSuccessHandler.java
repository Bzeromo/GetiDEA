package com.gi.giback.oauth2.handler;

import static com.gi.giback.oauth2.HttpCookieOAuth2AuthorizationRequestRepository.MODE_PARAM_COOKIE_NAME;
import static com.gi.giback.oauth2.HttpCookieOAuth2AuthorizationRequestRepository.REDIRECT_URI_PARAM_COOKIE_NAME;

import com.gi.giback.jwt.service.JwtService;
import com.gi.giback.mysql.entity.UserEntity;
import com.gi.giback.mysql.service.UserService;
import com.gi.giback.oauth2.HttpCookieOAuth2AuthorizationRequestRepository;
import com.gi.giback.oauth2.service.OAuth2UserPrincipal;
import com.gi.giback.oauth2.user.OAuth2Provider;
import com.gi.giback.oauth2.user.OAuth2UserUnlinkManager;
import com.gi.giback.oauth2.util.CookieUtils;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

@Slf4j
@RequiredArgsConstructor
@Component
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository;
    private final OAuth2UserUnlinkManager oAuth2UserUnlinkManager;
    private final JwtService jwtService;

    private UserService userService;

    @Autowired
    public void setUserService(@Lazy UserService userService) {
        this.userService = userService;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        String targetUrl;

        targetUrl = determineTargetUrl(request, response, authentication);

        if (response.isCommitted()) {
            logger.debug("Response has already been committed. Unable to redirect to " + targetUrl);
            return;
        }

        clearAuthenticationAttributes(request, response);
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

    @Override
    protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) {

        Optional<String> redirectUri = CookieUtils.getCookie(request, REDIRECT_URI_PARAM_COOKIE_NAME)
                .map(Cookie::getValue);

        String targetUrl = redirectUri.orElse(getDefaultTargetUrl());

        String mode = CookieUtils.getCookie(request, MODE_PARAM_COOKIE_NAME)
                .map(Cookie::getValue)
                .orElse("");

        OAuth2UserPrincipal principal = getOAuth2UserPrincipal(authentication);

        if (principal == null) {
            return UriComponentsBuilder.fromUriString(targetUrl)
                    .queryParam("error", "Login failed")
                    .build().toUriString();
        }

        if ("login".equalsIgnoreCase(mode)) {
            UserEntity user = userService.createUser(principal.getUserInfo());

            // 액세스 토큰, 리프레시 토큰 발급
            String accessToken = jwtService.createAccessToken(user.getUserEmail(), user.getUserName(), user.getProvider().toString());
            String refreshToken = jwtService.createRefreshToken(user.getUserEmail(), user.getProvider().toString());

            // 쿠키에 토큰 저장
            addTokenToCookies(response, "access_token", accessToken, 24 * 60 * 60); // 1일
            addTokenToCookies(response, "refresh_token", refreshToken, 7 * 24 * 60 * 60); // 7일
            // 리프레시 토큰 DB 저장
            userService.updateRefreshToken(principal.getUserInfo().getEmail(), refreshToken);

            // 지금은 파라미터에 보내는 중 but body에 담아서 보내는것이 안전
            return UriComponentsBuilder.fromUriString(targetUrl).build().toUriString();

        } else if ("unlink".equalsIgnoreCase(mode)) { // 회원 탈퇴

            String accessToken = principal.getUserInfo().getAccessToken();
            OAuth2Provider provider = principal.getUserInfo().getProvider();

            // DB 삭제
            userService.deleteUserAndRefreshToken(principal.getUserInfo().getEmail());
            oAuth2UserUnlinkManager.unlink(provider, accessToken);

            return UriComponentsBuilder.fromUriString(targetUrl)
                    .build().toUriString();
        }

        return UriComponentsBuilder.fromUriString(targetUrl)
                .queryParam("error", "Login failed")
                .build().toUriString();
    }

    private OAuth2UserPrincipal getOAuth2UserPrincipal(Authentication authentication) {
        Object principal = authentication.getPrincipal();

        if (principal instanceof OAuth2UserPrincipal) {
            return (OAuth2UserPrincipal) principal;
        }
        return null;
    }

    protected void clearAuthenticationAttributes(HttpServletRequest request, HttpServletResponse response) {
        super.clearAuthenticationAttributes(request);
        httpCookieOAuth2AuthorizationRequestRepository.removeAuthorizationRequestCookies(request, response);
    }

    private void addTokenToCookies(HttpServletResponse response, String name, String value, int maxAge) {
        Cookie cookie = new Cookie(name, value);
        cookie.setPath("/");

        cookie.setMaxAge(maxAge);
        response.addCookie(cookie);
    }
}
