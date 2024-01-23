package com.gi.giback.mongo.service;

import com.gi.giback.mongo.entity.MongoTestEntity;
import com.gi.giback.mongo.repository.MongoTestRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MongoTestService {
    @Autowired
    private MongoTestRepository mongoTestRepository;

    public boolean insertData(MongoTestEntity entity) {
        mongoTestRepository.save(entity);
        return true;
    }

    public List<MongoTestEntity> getAllData() {
        return mongoTestRepository.findAll();
    }

    public Optional<MongoTestEntity> getDataById(String id) {
        return mongoTestRepository.findById(id);
    }
}
