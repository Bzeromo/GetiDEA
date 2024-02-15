package com.gi.giback.dto;

import java.time.LocalDateTime;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProjectInfoDTO {
    private Long projectId;
    private String templateId;
    private String projectName;
    private boolean bookmark;
    private String thumbnail;
    private LocalDateTime lastUpdateTime;
}
