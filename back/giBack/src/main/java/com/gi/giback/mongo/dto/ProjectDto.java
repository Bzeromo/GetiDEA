package com.gi.giback.mongo.dto;

import jakarta.persistence.Id;
import java.time.LocalDateTime;
import java.util.Map;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProjectDto {
    @Id
    private String id;
    private String projectName;
    private LocalDateTime lasUpdateTime;
    private Map<String, Object> data;
}