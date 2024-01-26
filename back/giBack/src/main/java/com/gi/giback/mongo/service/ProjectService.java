package com.gi.giback.mongo.service;

import com.gi.giback.mongo.entity.ProjectEntity;
import com.gi.giback.mongo.repository.ProjectRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository repository;

    public boolean addProject(ProjectEntity entity) {
        repository.save(entity);
        return true;
    }

    public Optional<ProjectEntity> getProject(String projectId) {
        return repository.findById(projectId);
    }
}
