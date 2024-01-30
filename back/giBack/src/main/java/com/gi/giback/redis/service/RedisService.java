package com.gi.giback.redis.service;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.gi.giback.redis.dto.ProjectData;
import com.gi.giback.redis.dto.RedisProjectDto;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
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

    public Object getLastProjectData(String projectId, String userId) { // 되돌리기에서 사용
        String key = projectId + ":" + userId;
        if(Boolean.TRUE.equals(redisTemplate.hasKey(key))){
            return redisTemplate.opsForList().rightPop(key);
            // 마지막 값 pop 작업 수행 후 반환
            // if 앞으로 돌리기 작업 추가시 꺼내온 값을 다른 곳에 임시 저장 필요
        }
        return null;
    }

    // projectId가 일치하는 곳의 모든 사용자의 변경사항 시간 순서로 정렬후 리턴
    public List<ProjectData> getAllDataProject(String projectId) throws JsonProcessingException {
        List<ProjectData> results = new ArrayList<>();
        ObjectMapper objectMapper = new ObjectMapper();

        Set<String> keys = redisTemplate.keys(projectId + ":*");

        for (String key : keys) {
            List<Object> data = redisTemplate.opsForList().range(key, 0, -1);
            for (Object o : data) {
                ProjectData projectData = objectMapper.readValue((String) o, ProjectData.class);
                results.add(projectData);
            }
        }

        results.sort(Comparator.comparing(ProjectData::getUpdateTime));
        return results;
    }

    // projectId + UserId 기준으로 어떤 사용자가 프로젝트를 종료했을때 호출하여
    // 해당 사용자의 기록을 지움
    public void deleteData(String projectId, String userId) {
        String key = projectId + ":" + userId;
        redisTemplate.delete(key);
    }

    // projectId에 해당하는 프로젝트에 사용자가 하나도 남지 않았을때
    // 저장을 하고 호출하여 프로젝트 정보를 삭제
    public void deleteAllDataByProjectId(String projectId) {
        Set<String> keysToDelete = redisTemplate.keys(projectId + ":*");
        redisTemplate.delete(keysToDelete);
    }

    public void addChatLog(){

    }
}
