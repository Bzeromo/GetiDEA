package com.gi.giback.mysql.folder.dto;

import lombok.Data;

@Data
public class FolderResponseDto {
    private Long folderId;
    private Long userId;
    private String folderName;
}
