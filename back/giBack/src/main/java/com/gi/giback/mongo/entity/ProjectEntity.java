package com.gi.giback.mongo.entity;

import jakarta.persistence.Id;
import java.time.LocalDateTime;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
@NoArgsConstructor
public class ProjectEntity {
    @Id
    private String id;
    private String projectName;
    private LocalDateTime lasUpdateTime;
    private org.bson.Document data;
}
