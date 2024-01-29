package com.gi.giback.redis.service;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gi.giback.redis.dto.RedisProjectDto;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.Cursor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ScanOptions;
import org.springframework.stereotype.Service;

@Service
public class RedisService {
    @Autowired
    private RedisTemplate<String,Object> redisTemplate;

    public void saveData(RedisProjectDto data) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        String key= data.getProjectId() + ":" + data.getUserId();

        Map<String,Object> combinedData = new HashMap<>();
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        combinedData.put("updateTime", now.format(formatter));
        combinedData.put("preData", data.getPreData());
        combinedData.put("newData", data.getNewData());
        String jsonData = objectMapper.writeValueAsString(combinedData);

        redisTemplate.opsForList().rightPush(key, jsonData);
    }

    public List<Object> getProjectData(String projectId, String userId) { // 프로젝트 전체 불러오기에서 사용
        String key = projectId + ":" + userId;
        return redisTemplate.opsForList().range(key, 0, -1);
    }

    public Object getLastProjectData(String projectId, String userId) { // 되돌리기에서 사용
        String key = projectId + ":" + userId;
        List<Object> data = redisTemplate.opsForList().range(key, -1, -1);
        return data != null && !data.isEmpty() ? data.get(0) : null;
    }

    public List<Object> getAllProjectData(String projectId) {
        return redisTemplate.opsForList().range(projectId, 0, -1);
    }

    public List<Object> getAllDataForProject(String projectId) {
        List<Object> results = new ArrayList<>();
        try (Cursor<byte[]> cursor = (Cursor) redisTemplate.getConnectionFactory().getConnection().scan(
            ScanOptions.scanOptions().match(projectId + ":*").count(1000).build())) {
            while (cursor.hasNext()) {
                String key = new String(cursor.next());
                List<Object> data = redisTemplate.opsForList().range(key, 0, -1);
                results.addAll(data);
            }
        } catch (Exception e) {
            // 예외 처리
        }
        return results;
    }

//    public void removeProjectData(String projectId) {
//        redisTemplate.delete(projectId);
//    }
//
//    public void removeData(String projectId, String userId) {
//        String key = projectId +":"+ userId;
//        redisTemplate.delete(key);
//    }
}
