package com.gi.giback.mysql.location;

import jakarta.persistence.Column;
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
    private String locationId;

    private Long folderId;

    private String userId;

    private String projectId;

    private Integer authority;

    private Boolean bookmark;
}
