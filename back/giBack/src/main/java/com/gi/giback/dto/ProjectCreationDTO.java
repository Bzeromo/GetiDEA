package com.gi.giback.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProjectCreationDTO {
    private String projectName;
    private String templateId;
    private String userEmail;
    private String folderName; // 선택적 필드, 기본값을 처리하기 위해 자바 측에서 로직을 추가할 수 있음

    public String getFolderName() {
        return folderName == null ? "GetIdeaMain" : folderName; // 기본값 처리
    }
}
