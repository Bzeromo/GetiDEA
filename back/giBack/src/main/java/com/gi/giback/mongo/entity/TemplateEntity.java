package com.gi.giback.mongo.entity;

import jakarta.persistence.Id;
import java.util.Map;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
@NoArgsConstructor
public class TemplateEntity {
    @Id
    private String id;
    private Map<String, Object> data;

    // getters and setters
}
