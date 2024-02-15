package com.gi.giback.dto;

import lombok.Data;

@Data
public class LocationMoveDTO {
    private String userEmail;
    private Long projectId;
    private String newFolderName;
}
