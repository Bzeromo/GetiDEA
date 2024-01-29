package com.gi.giback.mongo.entity;

import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
@NoArgsConstructor
public class MongoTestEntity{
    @Id
    private String id;

    private String name;

    private int age;
}
