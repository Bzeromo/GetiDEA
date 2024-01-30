package com.gi.giback.mongo.controller;

import com.gi.giback.mongo.dto.ChatMessage;
import com.gi.giback.mongo.dto.ProjectDto;
import com.gi.giback.mongo.entity.ProjectEntity;
import com.gi.giback.mongo.service.ChatService;
import com.gi.giback.mongo.service.ProjectService;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/mongo")
@Tag(name = "Mongo 테스트", description = "몽고DB 테스트용 API")
public class MongoController {
    @Autowired
    private ProjectService service;

    @Autowired
    private ChatService chatService;

    @PostMapping("/project")
    public String addProject(@RequestBody ProjectDto data){
        ProjectEntity entity = new ProjectEntity();

        entity.setProjectId(data.getProjectId());
        entity.setProjectName(data.getProjectName());
        entity.setThumbnail(data.getThumbnail());
        entity.setTemplateId(data.getTemplateId());
        LocalDateTime now = LocalDateTime.now(ZoneId.of("Asia/Seoul"));
        String formattedDateTime = now.toString();
        entity.setLasUpdateTime(LocalDateTime.parse(formattedDateTime));
        entity.setData(new org.bson.Document(data.getData()));

        boolean result;
        System.out.println(entity.toString());
        result = service.addProject(entity);

        if(result) return "ok";
        else return "fail";
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<Optional<ProjectEntity>> getProject(@PathVariable("projectId") String projectId){
        Optional<ProjectEntity> entity = service.getProject(projectId);
        if(entity.isPresent()) return ResponseEntity.ok(entity);
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/chat/{projectId}")
    public ResponseEntity<Void> addChatMessage(@PathVariable String projectId, @RequestBody ChatMessage chatMessage) {
        chatService.addChatLog(projectId, chatMessage);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/chat/{projectId}")
    public ResponseEntity<List<ChatMessage>> getChatLogs(@PathVariable String projectId) {
        List<ChatMessage> chatLogs = chatService.getChatLogsByProjectId(projectId);
        return ResponseEntity.ok(chatLogs);
    }

}
