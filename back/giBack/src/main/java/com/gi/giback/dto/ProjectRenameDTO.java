package com.gi.giback.dto;

import lombok.Data;

@Data
public class ProjectRenameDTO {
    private Long projectId;
    private String newProjectName;
}
