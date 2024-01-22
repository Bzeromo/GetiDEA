package com.gi.giback.controller;

import com.gi.giback.service.RedisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/redis")
public class RedisController {

    private final RedisService redisService;

    @Autowired
    public RedisController(RedisService redisService) {
        this.redisService = redisService;
    }

    @PostMapping("/set")
    public String setKeyValue(@RequestParam String key, @RequestParam String value) {
        redisService.setValue(key, value);
        return "Value set successfully";
    }

    @GetMapping("/get")
    public String getKeyValue(@RequestParam String key) {
        return redisService.getValue(key);
    }
}
