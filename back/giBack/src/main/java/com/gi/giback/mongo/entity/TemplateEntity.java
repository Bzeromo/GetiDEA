package com.gi.giback.mongo.entity;

import jakarta.persistence.Id;
import java.time.LocalDateTime;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
@NoArgsConstructor
public class TemplateEntity {
    @Id
    private String templateId;
    private String templateName;
    private LocalDateTime lastUpdateTime;
    private String author;
    private String thumbnail;
    private String description;
    private int price;
    private org.bson.Document data;

}
