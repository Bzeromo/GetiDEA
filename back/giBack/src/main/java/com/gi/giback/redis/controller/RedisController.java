package com.gi.giback.redis.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.gi.giback.redis.dto.ChatMessage;
import com.gi.giback.redis.dto.ProjectData;
import com.gi.giback.redis.dto.RedisProjectDto;
import com.gi.giback.redis.service.RedisChatService;
import com.gi.giback.redis.service.RedisService;
import java.util.ArrayList;
import java.util.List;
import java.util.SimpleTimeZone;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/redis")
public class RedisController {

    @Autowired
    private RedisService redisService;

    @Autowired
    private RedisChatService redisChatService;

    @PostMapping("/save") // Redis에 변경사항 저장
    public ResponseEntity<?> saveData(@RequestBody RedisProjectDto data)
        throws JsonProcessingException {
        redisService.saveData(data);
        return ResponseEntity.ok().build();
    }

//    @GetMapping("/{projectId}") // Redis -> Mongo 이동을 위해 프로젝트 전체 변동사항 호출
//    public ResponseEntity<RedisProjectEntity> getAllData(@PathVariable("projectId") String projectId) {
//        RedisProjectEntity data = (RedisProjectEntity) redisService.getData(projectId);
//        return ResponseEntity.ok(data);
//    }
//
    @GetMapping("/{projectId}/{userId}") // 되돌리기 기능을 위한 User별 변동사항 호출
    public ResponseEntity<Object> getUserData(@PathVariable("projectId") String projectId, @PathVariable("userId") String userId) {
        Object data = redisService.getLastProjectData(projectId, userId);
        return ResponseEntity.ok(data);
    }

    @GetMapping("/{projectId}") // merge를 위한 변경사항 전체
    public ResponseEntity<List<ProjectData>> getUserData(@PathVariable("projectId") String projectId)
        throws JsonProcessingException {
        List<ProjectData> data = redisService.getAllDataProject(projectId);
        return ResponseEntity.ok(data);
    }
//
//    @DeleteMapping("/{projectId}")
//    public ResponseEntity<?> deleteData(@PathVariable("projectId") String projectId){
//        redisService.removeData(projectId);
//        return ResponseEntity.ok().build();
//    }

    // 채팅 저장 restapi
    @PostMapping("/chat/{projectId}")
    public ResponseEntity<?> saveChat(@PathVariable("projectId")String projectId, @RequestBody
        ChatMessage chatMessage) {
        if(redisChatService.addChatLog(projectId, chatMessage)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }

    // 채팅 로그 불러서 저장하기 위한 GetMapping
    @GetMapping("/chat/{projectId}")
    public ResponseEntity<List<ChatMessage>> getChatLog(@PathVariable("projectId") String projectId) {
        List<ChatMessage> list = new ArrayList<>();
        list = redisChatService.getChatLog(projectId);
        return ResponseEntity.ok(list);
    }

}
