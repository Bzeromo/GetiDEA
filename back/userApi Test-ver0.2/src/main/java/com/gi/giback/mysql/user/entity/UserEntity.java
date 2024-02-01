package com.gi.giback.mysql.user.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data // Lombok -Getter, Setter
@NoArgsConstructor // 기본 생성자 생성
@AllArgsConstructor // 전체 필드에 대한 생성자를 만들어준다.
@Builder
@Entity // JPA Entity
@Table(name = "users") // JPA Table
public class UserEntity {

    @Id // JPA - PK
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "user_name", nullable = false)
    private String userName;

    @Column(name = "user_email", nullable = false)
    private String userEmail;

    @Column(name = "profile_image")
    private String profileImage;

    @Column(name = "social_provider")
    private String provider;

    @Column(name = "access_token")
    private String accessToken;
}


