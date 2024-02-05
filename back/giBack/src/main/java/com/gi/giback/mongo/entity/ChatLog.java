package com.gi.giback.mongo.entity;

import com.gi.giback.mongo.dto.ChatMessage;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "chatLogs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatLog {
    @Id
    private Long projectId;
    private List<ChatMessage> chats;
}