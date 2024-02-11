package com.gi.giback.dto;

import java.time.LocalDateTime;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.java.Log;

@Data
@NoArgsConstructor
public class ChatSendDTO {
    private Long projectId;
    private String userEmail;
    private String profileImg;
    private String message;
    private LocalDateTime timestamp;

}
