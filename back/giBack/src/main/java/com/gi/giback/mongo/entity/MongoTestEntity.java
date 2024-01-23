package com.gi.giback.mongo.entity;

import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "test")
@Data
@NoArgsConstructor
public class MongoTestEntity{
    @Id
    private String id;

    @Field(name="name")
    private String name;

    @Field(name="age")
    private int age;
}
