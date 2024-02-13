package com.gi.giback.redis;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gi.giback.dto.ProjectInputDTO;
import com.gi.giback.dto.ProjectProcessDTO;
import com.gi.giback.mongo.service.ProjectService;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class RedisService {

    private final RedisTemplate<String,Object> redisTemplate;
    private final ProjectService projectService;

    @Autowired
    public RedisService(RedisTemplate<String, Object> redisTemplate, ProjectService projectService) {
        this.redisTemplate = redisTemplate;
        this.projectService = projectService;
    }

    public void saveData(ProjectInputDTO data) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        Long projectId = data.getProjectId();
        String key= data.getProjectId() + ":" + data.getUserEmail();
        ListOperations<String, Object> listOps = redisTemplate.opsForList();

        Map<String,Object> combinedData = new HashMap<>();
        LocalDateTime now = LocalDateTime.now(ZoneId.of("Asia/Seoul"));
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        combinedData.put("propId", data.getPropId());
        combinedData.put("updateTime", now.format(formatter));
        combinedData.put("preData", data.getPreData());
        combinedData.put("newData", data.getNewData());
        String jsonData = objectMapper.writeValueAsString(combinedData);

        listOps.rightPush(key, jsonData); // 2개씩 보내지는 버그(프론트) 고쳐지면 pop 기능 제거
        Long size = listOps.size(key);
        if (size != null && size > 60) { // 만약 크기가 30이 넘어가면 merge 작업 수행
            // 병합 작업 수행
            mergeProject(projectId);
        }
    }

    public Object getLastProjectData(Long projectId, String userEmail) { // 되돌리기에서 사용
        String key = projectId + ":" + userEmail;
        if(Boolean.TRUE.equals(redisTemplate.hasKey(key))){
            redisTemplate.opsForList().rightPop(key);
            return redisTemplate.opsForList().rightPop(key);
            // 마지막 값 pop 작업 수행 후 반환
            // if 앞으로 돌리기 작업 추가시 꺼내온 값을 다른 곳에 임시 저장 필요

        }
        return null;
    }

    // projectId가 일치하는 곳의 모든 사용자의 변경사항 시간 순서로 정렬후 리턴
    public boolean mergeProject(Long projectId)
        throws JsonProcessingException {
        List<ProjectProcessDTO> results = new ArrayList<>();
        ObjectMapper objectMapper = new ObjectMapper();

        Set<String> keys = redisTemplate.keys(projectId + ":*");

        if(keys != null) {
            for (String key : keys) {
                List<Object> data = redisTemplate.opsForList().range(key, 0, -1);
                assert data != null;
                for (Object o : data) {
                    ProjectProcessDTO projectProcessDTO = objectMapper.readValue((String) o,
                        ProjectProcessDTO.class);
                    results.add(projectProcessDTO);
                }

                int currentSize = data.size();

                int remainSize = 5;
                if (currentSize > remainSize) {
                    int excessData = currentSize - remainSize;
                    // 초과하는 데이터를 삭제
                    for (int i = 0; i < excessData; i++) {
                        redisTemplate.opsForList().leftPop(key);
                    }
                }
            }
            results.sort(Comparator.comparing(ProjectProcessDTO::getUpdateTime));
            return projectService.updateData(projectId, results);
        }
        return true;
    }

    // projectId + UserId 기준으로 어떤 사용자가 프로젝트를 종료했을때 호출하여
    // 해당 사용자의 기록을 지움
    public void deleteData(Long projectId, String userEmail) {
        String key = projectId + ":" + userEmail;
        redisTemplate.delete(key);
    }
}
