package com.gi.giback.mysql.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // Getter를 만들어주는 어노테이션
@NoArgsConstructor
@AllArgsConstructor // 전체 필드에 대한 생성자를 만들어준다
@Builder // 영속성을 위한 어노테이션
@Entity
@Table(name = "folders")
public class FolderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long folderId;

    private String userEmail;

    private String folderName;
}
