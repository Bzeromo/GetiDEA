package com.gi.giback.redis.entity;

import java.util.Map;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class State {

    private Map<String, Object> attributes;
}
