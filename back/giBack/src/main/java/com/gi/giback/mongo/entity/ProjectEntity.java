package com.gi.giback.mongo.entity;

import java.util.Map;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.persistence.Id;
@Document
@Data
@NoArgsConstructor
public class ProjectEntity {
    @Id
    private String id;
    private Map<String, Object> data;

    // getters and setters
}
