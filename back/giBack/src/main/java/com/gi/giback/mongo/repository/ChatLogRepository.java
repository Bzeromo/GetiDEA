package com.gi.giback.mongo.repository;

import com.gi.giback.mongo.entity.ChatLog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatLogRepository extends MongoRepository<ChatLog, String> {
    void deleteByProjectId(Long projectId);
}
