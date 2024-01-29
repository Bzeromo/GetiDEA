package com.gi.giback.mongo.dto;

import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
public class MongoTestDto{
    @Id
    private String id;

    private String name;

    private int age;
}

