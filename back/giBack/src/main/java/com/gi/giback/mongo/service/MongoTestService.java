package com.gi.giback.mongo.service;

import com.gi.giback.mongo.entity.MongoTestEntity;
import com.gi.giback.mongo.repository.MongoTestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MongoTestService {
    @Autowired
    private MongoTestRepository repository;

    public void saveTest(MongoTestEntity entity) {
        repository.save(entity);
    }

}
