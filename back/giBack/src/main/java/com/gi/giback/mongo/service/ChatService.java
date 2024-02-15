package com.gi.giback.mongo.service;

import com.gi.giback.dto.ChatDTO;
import com.gi.giback.dto.ChatSendDTO;
import com.gi.giback.mongo.entity.ChatLog;
import com.mongodb.client.result.UpdateResult;
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
    private final MongoTemplate mongoTemplate;
    @Autowired
    public ChatService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public boolean addChatLog(ChatSendDTO data) {
        Long projectId = data.getProjectId();
        ChatDTO chatMessage = new ChatDTO(data.getUserEmail(), data.getProfileImg(),
            data.getMessage(), LocalDateTime.now(ZoneId.of("Asia/Seoul")));

        Query query = new Query(Criteria.where("projectId").is(projectId));
        Update update = new Update().push("chats", chatMessage);
        UpdateResult result = mongoTemplate.upsert(query, update, ChatLog.class);

        return result.getModifiedCount() > 0 || result.getUpsertedId() != null;
    }

    public List<ChatDTO> getChatLogsByProjectId(Long projectId) {
        Query query = new Query(Criteria.where("projectId").is(projectId));
        ChatLog chatLog = mongoTemplate.findOne(query, ChatLog.class);
        return chatLog != null ? chatLog.getChats() : null;
    }
}
