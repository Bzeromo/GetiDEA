package com.gi.giback.redis.dto;

import java.util.Map;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RedisProjectDto {
    private String projectId;
    private String userId;
    private Map<String, Object> preData;
    private Map<String, Object> newData;
}
