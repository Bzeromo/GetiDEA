package com.gi.giback.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter // lombok Getter, Setter
@Entity // JPA Entity
@Table(name = "users") // JPA Table
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
