package com.gi.giback.mongo.controller;

import com.gi.giback.mongo.dto.MongoTestDto;
import com.gi.giback.mongo.entity.MongoTestEntity;
import com.gi.giback.mongo.service.MongoTestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/mongotest")
public class MongoTestController {
    @Autowired
    private MongoTestService service;

    @PostMapping
    public String postTest(@RequestBody MongoTestDto data) {
        MongoTestEntity entity = new MongoTestEntity();
        entity.setId(data.getId());
        entity.setName(data.getName());
        entity.setAge(data.getAge());

        service.saveTest(entity);

        return "ok";
    }


}
