package com.gi.giback.mongo.service;

import com.gi.giback.mongo.entity.ProjectEntity;
import com.gi.giback.mongo.repository.ProjectRepository;
import com.gi.giback.redis.dto.ProjectData;
import com.gi.giback.redis.dto.RedisProjectDto;
import com.mongodb.bulk.BulkWriteResult;
import java.time.LocalDateTime;
import java.time.ZoneId;
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


    // Redis 업데이트 정보(datas)와 MongoDB Project 정보 Merge
//    public boolean updateData(String projectId, List<ProjectData> datas){
//        // Mongo에서 projectId기준으로 쿼리 생성
//        Query query = new Query(Criteria.where("projectId").is(projectId));
//
//        for (ProjectData data : datas) {
//            System.out.println(data.getPropId() + " : " + data.getNewData().toString());// 레디스에서 가져온 리스트 만큼 반복
//            String propId = data.getPropId(); // mongodb query를 통해 가져온 data와 객체 Id 비교후 업데이트
//            Update update = new Update().set("data." + propId, data.getNewData());
//            mongoTemplate.updateFirst(query, update, ProjectEntity.class); // 일치한 첫번쨰 data에 업데이트 작업
//        }
//        Update update = new Update().set("lastUpdateTime", LocalDateTime.now(ZoneId.of("Asia/Seoul")));
//        mongoTemplate.updateFirst(query, update, ProjectEntity.class);
//
//        return true;
//    }

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
}
