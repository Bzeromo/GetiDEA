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
    private MongoTestRepository repository;

    public MongoTestEntity createTest(String name, int age) {
        MongoTestEntity test = new MongoTestEntity();
        test.setName(name);
        test.setAge(age);
        return repository.save(test);
    }

    public List<MongoTestEntity> getAllTest() {
        return repository.findAll();
    }

    public Optional<MongoTestEntity> getTestById(String id) {
        return repository.findById(id);
    }

    public MongoTestEntity updateTest(String id, String name, int age) {
        MongoTestEntity test = repository.findById(id).orElseThrow();
        test.setName(name);
        test.setAge(age);
        return repository.save(test);
    }

    public void deleteTest(String id) {
        repository.deleteById(id);
    }
}
