package com.gi.giback.mongo.controller;

import com.gi.giback.mongo.entity.MongoTestEntity;
import com.gi.giback.mongo.service.MongoTestService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/samples")
public class MongoTestController {
    @Autowired
    private MongoTestService service;

    @PostMapping
    public MongoTestEntity createSample(@RequestParam String name, @RequestParam int age) {
        return service.createTest(name, age);
    }

    @GetMapping
    public List<MongoTestEntity> getAllTest() {
        return service.getAllTest();
    }

    @GetMapping("/{id}")
    public MongoTestEntity getTestById(@PathVariable String id) {
        return service.getTestById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public MongoTestEntity updateSample(@PathVariable String id, @RequestParam String name,@RequestParam int age) {
        return service.updateTest(id, name, age);
    }

    @DeleteMapping("/{id}")
    public void deleteSample(@PathVariable String id) {
        service.deleteTest(id);
    }

}
