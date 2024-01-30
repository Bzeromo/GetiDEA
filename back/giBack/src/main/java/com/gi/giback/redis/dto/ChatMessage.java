package com.gi.giback.redis.dto;

import java.time.LocalDateTime;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ChatMessage {
    private String userId;
    private String profileImg;
    private String message;
    private LocalDateTime timestamp;

}
