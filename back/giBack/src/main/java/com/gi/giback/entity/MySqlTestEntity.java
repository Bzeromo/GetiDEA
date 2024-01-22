package com.gi.giback.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="test")
public class MySqlTestEntity {
    @Id
    private String id;
    private String name;
}
