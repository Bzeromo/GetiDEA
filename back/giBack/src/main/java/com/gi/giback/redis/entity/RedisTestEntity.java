package com.gi.giback.redis.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@RedisHash("RedisTestEntity")
@Data
@NoArgsConstructor
public class RedisTestEntity {
    @Id
    private String id;
    private String data;
}
