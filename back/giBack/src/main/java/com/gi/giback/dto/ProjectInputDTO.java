package com.gi.giback.dto;

import java.util.Map;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProjectInputDTO {
    private Long projectId;
    private String userEmail;
    private String propId;
    private Map<String, Object> preData;
    private Map<String, Object> newData;
}
