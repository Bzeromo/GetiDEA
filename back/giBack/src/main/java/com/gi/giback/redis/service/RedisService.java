package com.gi.giback.redis.service;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gi.giback.mongo.service.ProjectService;
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
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class RedisService {

    private final int remainData = 5;

    @Autowired
    private RedisTemplate<String,Object> redisTemplate;

    @Autowired
    private ProjectService projectService;

    public void saveData(RedisProjectDto data) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        String projectId = data.getProjectId();
        String key= data.getProjectId() + ":" + data.getUserId();
        ListOperations<String, Object> listOps = redisTemplate.opsForList();

        Map<String,Object> combinedData = new HashMap<>();
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        combinedData.put("propId", data.getPropId());
        combinedData.put("updateTime", now.format(formatter));
        combinedData.put("preData", data.getPreData());
        combinedData.put("newData", data.getNewData());
        String jsonData = objectMapper.writeValueAsString(combinedData);

        listOps.rightPush(key, jsonData);
        Long size = listOps.size(key);
        if (size != null && size > 30) { // 만약 크기가 30이 넘어가면 merge 작업 수행
            // 병합 작업 수행
            List<ProjectData> redisData = getAllDataProject(projectId);
            projectService.updateData(projectId, redisData);
        }
        
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

        assert keys != null;
        for (String key : keys) {
            List<Object> data = redisTemplate.opsForList().range(key, 0, -1);
            assert data != null;
            for (Object o : data) {
                ProjectData projectData = objectMapper.readValue((String) o, ProjectData.class);
                results.add(projectData);
            }

            int currentSize = 0;
            if(!data.isEmpty())
                currentSize = data.size();

            int maxDataSize = 5; // 최대로 남길 데이터 개수
            if (currentSize > maxDataSize) {
                int excessData = currentSize - maxDataSize;
                // 초과하는 데이터를 삭제
                for (int i = 0; i < excessData; i++) {
                    redisTemplate.opsForList().rightPop(key);
                }
            }

            // 되돌리기에 사용될 최대 5개 데이터만 남기고 삭제하는 방식
//            List<Object> tempData = new ArrayList<>();
//            int dataSize = redisTemplate.opsForList().size(key).intValue(); // 현재 데이터 개수
//            for (int i = 0; i < Math.min(dataSize, remainData); i++) {
//                Object tmp = redisTemplate.opsForList().rightPop(key);
//                if (tmp != null) {
//                    tempData.add(tmp);
//                }
//            }
//            redisTemplate.delete(key);
//
//            for (Object tmp : tempData) {
//                // saveDto 에 맞춰줘야함
//                ProjectData projectData = objectMapper.readValue((String) tmp, ProjectData.class);
//
//                redisTemplate.opsForList().leftPush(key, data);
//            }
        }

        results.sort(Comparator.comparing(ProjectData::getUpdateTime));
        return results;
    }

    // projectId + UserId 기준으로 어떤 사용자가 프로젝트를 종료했을때 호출하여
    // 해당 사용자의 기록을 지움
    public boolean deleteData(String projectId, String userId) {
        String key = projectId + ":" + userId;
        redisTemplate.delete(key);
        return true;
    }

    // projectId에 해당하는 프로젝트에 사용자가 하나도 남지 않았을때
    // 저장을 하고 호출하여 프로젝트 정보를 삭제
    public boolean deleteAllDataByProjectId(String projectId) {
        Set<String> keysToDelete = redisTemplate.keys(projectId + ":*");
        redisTemplate.delete(keysToDelete);
        return true;
    }

}
