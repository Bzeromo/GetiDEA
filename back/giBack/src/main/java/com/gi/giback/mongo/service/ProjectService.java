package com.gi.giback.mongo.service;

import com.gi.giback.mongo.entity.ProjectEntity;
import com.gi.giback.mongo.repository.ProjectRepository;
import com.gi.giback.redis.dto.ProjectData;
import com.mongodb.bulk.BulkWriteResult;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.BulkOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository repository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public boolean addProject(ProjectEntity entity) {
        repository.save(entity);
        return true;
    }

    // Project 오픈시 호출
    public Optional<ProjectEntity> getProject(String projectId) {
        return repository.findById(projectId);
    }

    public Optional<ProjectEntity> getProjectByIdWithDay(String projectId) {
        LocalDateTime sevenDaysAgo = LocalDateTime.now().minusDays(7);

        Query query = new Query(Criteria.where("projectId").is(projectId)
                .andOperator(Criteria.where("lastUpdateTime").gte(sevenDaysAgo)));

        ProjectEntity project = mongoTemplate.findOne(query, ProjectEntity.class);
        return Optional.ofNullable(project);
    }

    // bulk operation으로 업데이트 성능 최적화 코드 아직 사용x
    public boolean updateData(String projectId, List<ProjectData> datas) {
        Query query = new Query(Criteria.where("projectId").is(projectId));
        BulkOperations bulkOps = mongoTemplate.bulkOps(BulkOperations.BulkMode.UNORDERED, ProjectEntity.class);

        for (ProjectData data : datas) {
            String propId = data.getPropId();
            Update update = new Update().set("data." + propId, data.getNewData());
            bulkOps.updateOne(query, update);
        }

        BulkWriteResult result = bulkOps.execute();
        return result.wasAcknowledged();
    }

    public void deleteProjectByProjectId(String projectId) {
        repository.deleteByProjectId(projectId);
    }

    public Optional<ProjectEntity> updateProjectName(String projectId, String newProjectName) {
        Query query = new Query(Criteria.where("projectId").is(projectId));
        Update update = new Update().set("projectName", newProjectName);
        mongoTemplate.findAndModify(query, update, ProjectEntity.class);
        return Optional.ofNullable(mongoTemplate.findOne(query, ProjectEntity.class));
    }
}
