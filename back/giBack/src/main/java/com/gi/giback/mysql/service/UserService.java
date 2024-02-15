package com.gi.giback.mysql.service;

import com.gi.giback.dto.UserDTO;
import com.gi.giback.mysql.entity.UserEntity;
import com.gi.giback.mysql.repository.UserRepository;
import com.gi.giback.oauth2.user.OAuth2UserInfo;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserEntity createUser(OAuth2UserInfo userInfo) {
        UserEntity user = userRepository.findByUserEmail(userInfo.getEmail())
                .orElse(UserEntity.builder()
                        .userEmail(userInfo.getEmail())
                        .userName(userInfo.getUserName())
                        .profileImage(userInfo.getProfileImageUrl())
                        .provider(userInfo.getProvider())
                        .build());

        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
            user.passwordEncode(passwordEncoder);
        }

        return userRepository.save(user);
    }

    // 사용자 초대시 검색을 통해 이메일 리스트를 반환
    public List<UserDTO> searchUsersByEmail(String email) {
        return userRepository.findByEmailContaining(email);
    }

    public String getUserNameByEmail(String userEmail) {
        Optional<UserEntity> user = userRepository.findByUserEmail(userEmail);
        return user.map(UserEntity::getUserName).orElse(null); // 사용자가 존재하지 않는 경우 null 반환
    }

    // 사용자의 이메일로 공급자 정보를 조회하는 메서드
    public String getProviderByEmail(String userEmail) {
        Optional<UserEntity> user = userRepository.findByUserEmail(userEmail);
        return user.map(u -> u.getProvider().toString()).orElse(null); // 사용자가 존재하지 않는 경우 null 반환
    }

    // 리프레시 토큰을 저장하는 메서드
    public void updateRefreshToken(String userEmail, String refreshToken) {
        UserEntity user = userRepository.findByUserEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("Cannot find user with email: " + userEmail));
        user.updateRefreshToken(refreshToken);
        userRepository.save(user);
    }

    @Transactional
    public void deleteUserAndRefreshToken(String userEmail) {
        UserEntity user = userRepository.findByUserEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("Cannot find user with email: " + userEmail));
        userRepository.delete(user); // 사용자 정보 삭제

        // 리프레시 토큰을 관리하는 로직이 있다면 여기에서 리프레시 토큰 삭제 처리
    }

    public boolean validateRefreshToken(String userEmail, String refreshToken) {
        Optional<UserEntity> userOptional = userRepository.findByUserEmail(userEmail);
        if (userOptional.isPresent()) {
            UserEntity user = userOptional.get();
            return refreshToken.equals(user.getRefreshToken());
        }
        return false;
    }

    public UserEntity getUserByRefreshToken(String refreshToken) {
        Optional<UserEntity> userOptional = userRepository.findByRefreshToken(refreshToken);
        return userOptional.orElse(null);
    }

    @Transactional
    public boolean updateUserProfileImage(String userEmail, String imageUrl) {
        int updatedRows = userRepository.updateProfileImage(userEmail, imageUrl);
        return updatedRows > 0;
    }

    @Transactional
    public Optional<UserDTO> updateUserName(String userEmail, String newUserName) {
        return userRepository.findByUserEmail(userEmail).map(user -> {
            user.setUserName(newUserName);
            userRepository.save(user);
            return new UserDTO(user.getUserEmail(), user.getUserName(), user.getProfileImage());
        });
    }
}