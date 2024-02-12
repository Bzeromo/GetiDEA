package com.gi.giback.mysql.repository;

import com.gi.giback.dto.UserDTO;
import com.gi.giback.mysql.entity.UserEntity;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByUserEmail(String userEmail);
    Optional<UserEntity> findByUserName(String userName);
    Optional<UserEntity> findByRefreshToken(String refreshToken);

    // 이메일에 특정 문자열이 포함된 사용자를 검색하는 쿼리
    @Query("SELECT new com.gi.giback.dto.UserDTO(u.userEmail, u.userName, u.profileImage) FROM UserEntity u WHERE u.userEmail LIKE %?1%")
    List<UserDTO> findByEmailContaining(String email);
    @Modifying
    @Query("UPDATE UserEntity u SET u.profileImage = :imageUrl WHERE u.userEmail = :userEmail")
    int updateProfileImage(String userEmail, String imageUrl);
}
