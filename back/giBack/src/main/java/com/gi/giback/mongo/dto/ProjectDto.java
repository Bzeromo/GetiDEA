package com.gi.giback.mongo.dto;

import org.springframework.data.annotation.Id;
import java.time.LocalDateTime;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProjectDto {
    @Id
    private String projectId;
    private String templateId;
    private String projectName;
    private String thumbnail;
    private LocalDateTime lasUpdateTime;
    private org.bson.Document data;
}