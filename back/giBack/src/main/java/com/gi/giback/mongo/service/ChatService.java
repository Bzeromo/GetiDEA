package com.gi.giback.mongo.service;

import com.gi.giback.mongo.dto.ChatMessage;
import com.gi.giback.mongo.entity.ChatLog;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Service
public class ChatService {
    @Autowired
    private MongoTemplate mongoTemplate;

    public void addChatLog(Long projectId, ChatMessage chatMessage) {
        chatMessage.setTimestamp(LocalDateTime.now(ZoneId.of("Asia/Seoul")));
        Query query = new Query(Criteria.where("projectId").is(projectId));
        Update update = new Update().push("chats", chatMessage);
        mongoTemplate.upsert(query, update, ChatLog.class);
    }

    public List<ChatMessage> getChatLogsByProjectId(Long projectId) {
        Query query = new Query(Criteria.where("projectId").is(projectId));
        ChatLog chatLog = mongoTemplate.findOne(query, ChatLog.class);
        return chatLog != null ? chatLog.getChats() : null;
    }
}
