package com.gi.giback.mongo.controller;

import com.gi.giback.mongo.dto.ProjectDto;
import com.gi.giback.mongo.entity.ProjectEntity;
import com.gi.giback.mongo.service.ProjectService;
import java.time.LocalDateTime;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/mongo")
public class MongoController {
    @Autowired
    private ProjectService service;

    @PostMapping("/project")
    public String addProject(@RequestBody ProjectDto data){
        ProjectEntity entity = new ProjectEntity();

        entity.setId(data.getId());
        entity.setProjectName(data.getId());
        LocalDateTime now = LocalDateTime.now();
        String formattedDateTime = now.toString();
        entity.setLasUpdateTime(LocalDateTime.parse(formattedDateTime));
        entity.setData(new org.bson.Document(data.getData()));

        boolean result;
        result = service.addProject(entity);

        if(result) return "ok";
        else return "fail";
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<Optional<ProjectEntity>> getProject(@PathVariable("projectId") String projectId){
        Optional<ProjectEntity> entity = service.getProject(projectId);
        if(entity.isPresent()) return ResponseEntity.ok(entity);
        return ResponseEntity.badRequest().build();
    }

}
