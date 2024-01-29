package com.gi.giback.mysql.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // Lombok -Getter, Setter
@Entity // JPA Entity
@Table(name="test")
@NoArgsConstructor // 기본 생성자 생성
public class MySqlTestEntity {
    @Id
    private String id;
    private String name;
}
