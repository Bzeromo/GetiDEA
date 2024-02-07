package com.gi.giback.mysql.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // Getter를 만들어주는 어노테이션
@NoArgsConstructor(access = AccessLevel.PROTECTED) // 기본생성자 만들어줌
@AllArgsConstructor // 전체 필드에 대한 생성자를 만들어준다
@Builder // 영속성을 위한 어노테이션
@Entity
@Table(name = "locations")
public class LocationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long locationId; // MySQL의 AUTO_INCREMENT를 사용하려면 Long 타입이 적합

    @Builder.Default
    private String folderName = ""; // 기본값 ""

    private String userEmail;
    private String projectName;

    private Long projectId;

    @Builder.Default
    private Boolean authority = false; // 기본값 false

    @Builder.Default
    private Boolean bookmark = false; // 기본값 false
}
