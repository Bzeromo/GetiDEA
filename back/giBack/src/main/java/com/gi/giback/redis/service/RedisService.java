package com.gi.giback.redis.service;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gi.giback.redis.dto.ProjectData;
import com.gi.giback.redis.dto.RedisProjectDto;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
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
        combinedData.put("propId", data.getPropId());
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

    // projectId가 일치하는 곳의 모든 사용자의 변경사항 시간 순서로 정렬후 리턴
    public List<ProjectData> getAllDataProject(String projectId) {
        List<ProjectData> results = new ArrayList<>();
        ObjectMapper objectMapper = new ObjectMapper();
        try (Cursor<byte[]> cursor = (Cursor) redisTemplate.getConnectionFactory().getConnection().scan(
            ScanOptions.scanOptions().match(projectId + ":*").count(1000).build())) {
            while (cursor.hasNext()) {
                String key = new String(cursor.next());
                List<Object> data = redisTemplate.opsForList().range(key, 0, -1);
                for (Object o : data) {
                    ProjectData projectData = objectMapper.readValue((String) o, ProjectData.class);
                    results.add(projectData);
                }
            }
        } catch (Exception e) {
            // 예외 처리
        }
        results.sort(Comparator.comparing(ProjectData::getUpdateTime));
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
