package com.gi.giback.mongo.dto;

import java.time.LocalDateTime;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@Data
@NoArgsConstructor
public class ProjectDto {
    @Id
    private Long projectId;
    private String templateId;
    private String projectName;
    private String thumbnail;
    private LocalDateTime lasUpdateTime;
    private org.bson.Document data;
}