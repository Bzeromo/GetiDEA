package com.gi.giback.mongo.dto;

import java.time.LocalDateTime;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class

ChatMessage {
    private String userEmail;
    private String profileImg;
    private String message;
    private LocalDateTime timestamp;

}