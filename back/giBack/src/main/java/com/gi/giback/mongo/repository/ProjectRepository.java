package com.gi.giback.mongo.repository;

import com.gi.giback.mongo.entity.ProjectEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends MongoRepository<ProjectEntity, Long> {
    @Transactional
    void deleteByProjectId(Long projectId);
}
