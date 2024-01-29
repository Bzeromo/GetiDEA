package com.gi.giback.redis.controller;

import com.gi.giback.redis.entity.RedisTestEntity;
import com.gi.giback.redis.service.RedisTestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/redistest")
public class RedisTestController {
    @Autowired
    private RedisTestService service;

    @PostMapping
    public ResponseEntity<RedisTestEntity> createOrUpdate(@RequestBody RedisTestEntity entity) {
        return ResponseEntity.ok(service.saveOrUpdate(entity));
    }

    @GetMapping("/{id}")
    public ResponseEntity<RedisTestEntity> findById(@PathVariable String id) {
        return service.findById(id)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<Iterable<RedisTestEntity>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable String id) {
        service.deleteById(id);
        return ResponseEntity.ok().build();
    }
}