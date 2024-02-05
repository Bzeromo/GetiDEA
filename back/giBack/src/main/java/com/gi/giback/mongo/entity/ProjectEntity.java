package com.gi.giback.mongo.entity;

import java.time.LocalDateTime;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "projects")
@NoArgsConstructor
public class ProjectEntity {

    @Id
    private Long projectId;

    private String templateId;
    private String projectName;
    private String thumbnail;
    private LocalDateTime lastUpdateTime;
    private org.bson.Document data;
}
