package com.gi.giback.socket.controller;

import com.gi.giback.mongo.service.ProjectService;
import com.gi.giback.mongo.service.TemplateService;
import com.gi.giback.redis.service.RedisService;
import com.gi.giback.socket.dto.SocketData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/socket")
public class socketController {
    @Autowired
    private RedisService redisService;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private TemplateService templateService;

    @PostMapping
    public ResponseEntity<?> receiveDataFromSocket(@RequestBody SocketData data) {
        // 데이터 처리 로직
        // 데이터 분석 후 데이터 타입에 따라 서비스 호출
        // 1. 사용하지 않는 프로젝트 A에 사용자가 들어온 경우 => Mongo에서 A프로젝트에 대한
        // 데이터를 가져와 사용자에게 전달
        // 2. 사용중인 A프로젝트에서 사용자가 나갔을 경우 => redis에서 A프로젝트에 해당하는 데이터를 모두 가져와서
        // 타임스탬프 순으로 정렬 후 Mongo에서 A프로젝트에 대한 내용과 비교 후 데이터 수정후 사용자들에게 각 사용자의
        // 마지막 30%에 해당하는 데이터를 스택에 넣어줌
        // 3. 사용중인 A프로젝트에서 사용자가 들어왔을 경우 => 1번과 동일한 로직 수행후 변경된
        // Mongo의 값을 사용자에게 전달
        // 4. 특정 사용자 A의 Redis 데이터가 일정량을 초과했을 경우 => 2번과 동일
        // 예: Redis 또는 MongoDB 서비스 호출

        //redisService.processData(data);
        //mongoService.storeData(data);

        return ResponseEntity.ok().build();
    }

}
