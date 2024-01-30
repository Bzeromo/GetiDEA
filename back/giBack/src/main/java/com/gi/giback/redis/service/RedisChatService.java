package com.gi.giback.redis.service;

import com.gi.giback.redis.dto.ChatMessage;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class RedisChatService {
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;
    @Autowired
    private ListOperations<String, Object> listOperations;

    // 채팅 로그 추가
    public boolean addChatLog(String projectId, ChatMessage chatMessage) {
        listOperations.leftPush(projectId, chatMessage);
        return true;
    }

    // 채팅 로그 조회
    public List<ChatMessage> getChatLog(String projectId) {
        List<Object> chatLog = listOperations.range(projectId, 0, -1);
        List<ChatMessage> chatMessages = new ArrayList<>();

        for (Object chatEntry : chatLog) {
            if (chatEntry instanceof ChatMessage) {
                chatMessages.add((ChatMessage) chatEntry);
            }
        }

        return chatMessages;
    }

}
