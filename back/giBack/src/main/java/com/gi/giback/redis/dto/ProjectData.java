package com.gi.giback.redis.dto;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProjectData { // 데이터 역직렬화를 위한 객체
    private LocalDateTime updateTime;
    private String propId;
    private Map<String, Object> newData;
    private Map<String, Object> preData;

    // updateTime을 파싱하는 메서드 (LocalDateTime 형식으로)
    public static LocalDateTime parseUpdateTime(String updateTime) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return LocalDateTime.parse(updateTime, formatter);
    }
}
