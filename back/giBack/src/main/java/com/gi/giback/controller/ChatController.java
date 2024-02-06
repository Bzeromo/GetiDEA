package com.gi.giback.controller;

import com.gi.giback.mongo.dto.ChatMessage;
import com.gi.giback.mongo.service.ChatService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chat")
@Tag(name = "채팅 컨트롤러", description = "채팅 관련 컨트롤러")
@CrossOrigin
public class ChatController {
    @Autowired
    private ChatService chatService;
    @PostMapping("/send")
    @Operation(summary = "채팅 전송", description = "채팅 사용시 계속 호출해야함 / Mongo의 projectId가 일치하는 곳에 채팅 로그 저장")
    public ResponseEntity<Void> addChatMessage(
            @RequestParam @Parameter(description = "채팅 저장할 프로젝트 ID") Long projectId,
            @RequestBody @Parameter(description = "채팅 저장할 프로젝트 ID") ChatMessage chatMessage) {
        chatService.addChatLog(projectId, chatMessage);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/load")
    @Operation(summary = "채팅 내역 불러오기", description = "프로젝트 실행시 프로젝트와 함께 채팅도 불러와야함")
    public ResponseEntity<List<ChatMessage>> getChatLogs(@RequestParam @Parameter(description = "채팅 로그 불러올 프로젝트 ID") Long projectId) {
        List<ChatMessage> chatLogs = chatService.getChatLogsByProjectId(projectId);
        return ResponseEntity.ok(chatLogs);
    }
}
