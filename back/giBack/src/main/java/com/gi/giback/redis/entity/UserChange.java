package com.gi.giback.redis.entity;

import java.time.LocalDateTime;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserChange {

    private LocalDateTime updateTime;
    private State preState;
    private State curState;

    // getters and setters
}
