package com.gi.giback.redis.service;

import com.gi.giback.redis.entity.RedisTestEntity;
import com.gi.giback.redis.repository.RedisTestRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RedisTestService {
    @Autowired
    private RedisTestRepository repository;

    public RedisTestEntity saveOrUpdate(RedisTestEntity example) {
        return repository.save(example);
    }

    public Optional<RedisTestEntity> findById(String id) {
        return repository.findById(id);
    }

    public Iterable<RedisTestEntity> findAll() {
        return repository.findAll();
    }

    public void deleteById(String id) {
        repository.deleteById(id);
    }
}