package com.gi.giback.mysql.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // Lombok -Getter, Setter
@Entity // JPA Entity
@Table(name = "users") // JPA Table
@NoArgsConstructor // 기본 생성자 생성
public class UserEntity {

    @Id // JPA - PK
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false)
    private String userName;

    @Column(nullable = false)
    private String userEmail;

    private String profileImg;

    private String provider;

    private String accessToken;

    private boolean isAdmin;

}
