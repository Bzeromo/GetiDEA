package com.gi.giback.mongo.service;

import com.gi.giback.dto.ProjectCreationDTO;
import com.gi.giback.dto.ProjectInfoDTO;
import com.gi.giback.mongo.entity.ProjectEntity;
import com.gi.giback.mongo.entity.TemplateEntity;
import com.gi.giback.mongo.repository.ChatLogRepository;
import com.gi.giback.mongo.repository.ProjectRepository;
import com.gi.giback.dto.ProjectProcessDTO;
import com.gi.giback.mongo.repository.TemplateRepository;
import com.gi.giback.mysql.service.LocationService;
import com.mongodb.bulk.BulkWriteResult;
import com.mongodb.client.result.UpdateResult;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.BulkOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    private final ProjectRepository repository;
    private final ChatLogRepository chatLogRepository;
    private final MongoTemplate mongoTemplate;
    private final TemplateRepository templateRepository;
    private final LocationService locationService;

    @Autowired
    public ProjectService(ProjectRepository repository, ChatLogRepository chatLogRepository,
        MongoTemplate mongoTemplate, TemplateRepository templateRepository,
        LocationService locationService) {
        this.repository = repository;
        this.chatLogRepository = chatLogRepository;
        this.mongoTemplate = mongoTemplate;
        this.templateRepository = templateRepository;
        this.locationService = locationService;
    }

    public ProjectEntity createProject(ProjectCreationDTO projectCreationDto) {

        String projectName = projectCreationDto.getProjectName();
        String templateId = projectCreationDto.getTemplateId();
        String userEmail = projectCreationDto.getUserEmail();
        String folderName = Optional.ofNullable(projectCreationDto.getFolderName())
            .filter(name -> !name.isBlank())
            .orElse("GetIdeaMain");


        Optional<TemplateEntity> templateEntity = templateRepository.findById(templateId);
        if(templateEntity.isPresent()){
            TemplateEntity template = templateEntity.get();
            Long projectId = getNextProjectId(); // 다음 프로젝트 id

            ProjectEntity project = new ProjectEntity();
            project.setProjectId(projectId);
            project.setProjectName(projectName);
            project.setTemplateId(templateId);
            project.setThumbnail(template.getThumbnail());
            project.setLastUpdateTime(LocalDateTime.now(ZoneId.of("Asia/Seoul")));
            project.setData(template.getData());

            ProjectEntity savedProject = repository.save(project);
            locationService.createLocation(userEmail, projectId, projectName, folderName);
            return savedProject;
        }
        return null;
    }

    // Project 오픈시 호출
    public Optional<ProjectEntity> getProject(Long projectId) {
        return repository.findById(projectId);
    }

    // data 내용을 제외한 프로젝트 Info만 가져오는 서비스
    public Optional<ProjectInfoDTO> getProjectInfoByIdWithDay(Long projectId) {
        LocalDateTime sevenDaysAgo = LocalDateTime.now().minusDays(7);
        Query query = new Query(Criteria.where("projectId").is(projectId)
            .andOperator(Criteria.where("lastUpdateTime").gte(sevenDaysAgo)));

        // 필요한 필드만 포함하도록 프로젝션 설정
        query.fields().include("projectId").include("templateId").include("projectName")
            .include("thumbnail").include("lastUpdateTime");

        ProjectEntity project = mongoTemplate.findOne(query, ProjectEntity.class);

        if (project != null) {
            ProjectInfoDTO projectInfoDTO = new ProjectInfoDTO();
            projectInfoDTO.setProjectId(project.getProjectId());
            projectInfoDTO.setTemplateId(project.getTemplateId());
            projectInfoDTO.setProjectName(project.getProjectName());
            projectInfoDTO.setThumbnail(project.getThumbnail());
            projectInfoDTO.setLastUpdateTime(project.getLastUpdateTime());
            return Optional.of(projectInfoDTO);
        } else {
            return Optional.empty();
        }
    }

    public Optional<ProjectInfoDTO> getProjectInfo(Long projectId) {
        Query query = new Query(Criteria.where("projectId").is(projectId));

        // 필요한 필드만 포함하도록 프로젝션 설정
        query.fields().include("projectId").include("templateId").include("projectName")
            .include("thumbnail").include("lastUpdateTime");

        ProjectEntity project = mongoTemplate.findOne(query, ProjectEntity.class);

        if (project != null) {
            ProjectInfoDTO projectInfoDTO = new ProjectInfoDTO();
            projectInfoDTO.setProjectId(project.getProjectId());
            projectInfoDTO.setTemplateId(project.getTemplateId());
            projectInfoDTO.setProjectName(project.getProjectName());
            projectInfoDTO.setThumbnail(project.getThumbnail());
            projectInfoDTO.setLastUpdateTime(project.getLastUpdateTime());
            return Optional.of(projectInfoDTO);
        } else {
            return Optional.empty();
        }
    }

    // bulk operation으로 업데이트 성능 최적화 코드 아직 사용x
    public boolean updateData(Long projectId, List<ProjectProcessDTO> datas) {
        Query query = new Query(Criteria.where("projectId").is(projectId));
        BulkOperations bulkOps = mongoTemplate.bulkOps(BulkOperations.BulkMode.UNORDERED, ProjectEntity.class);

        LocalDateTime currentTime = LocalDateTime.now(ZoneId.of("Asia/Seoul"));

        if (datas.isEmpty()){
            return true;
        }

        for (ProjectProcessDTO data : datas) {
            String propId = data.getPropId();
            Update update = new Update().set("data." + propId, data.getNewData())
                .set("lastUpdateTime", currentTime);
            bulkOps.updateOne(query, update);
        }

        BulkWriteResult result = bulkOps.execute();
        return result.wasAcknowledged();
    }

    public void deleteProjectByProjectId(Long projectId) {
        chatLogRepository.deleteByProjectId(projectId);
        repository.deleteByProjectId(projectId);
    }

    public Optional<ProjectEntity> updateProjectName(Long projectId, String newProjectName) {
        LocalDateTime currentTime = LocalDateTime.now(ZoneId.of("Asia/Seoul"));
        Query query = new Query(Criteria.where("projectId").is(projectId));
        Update update = new Update().set("projectName", newProjectName)
            .set("lastUpdateTime", currentTime);
        mongoTemplate.findAndModify(query, update, ProjectEntity.class);
        return Optional.ofNullable(mongoTemplate.findOne(query, ProjectEntity.class));
    }

    public Long getNextProjectId() {
        ProjectEntity highestProject = mongoTemplate.find(
            Query.query(new Criteria()).with(Sort.by(Sort.Direction.DESC, "projectId")).limit(1),
            ProjectEntity.class).stream().findFirst().orElse(null);
        if (highestProject == null) {
            return 1L; // 프로젝트가 없으면 1 반환
        } else {
            return highestProject.getProjectId() + 1; // 가장 큰 projectId 찾아 +1
        }
    }

    public void updateProjectThumbnail(Long projectId, String imageUrl) {
        // projectId 검증
        Optional<ProjectEntity> entity = repository.findById(projectId);
        if(entity.isEmpty()) return; // 없으면 false 리턴

        LocalDateTime currentTime = LocalDateTime.now(ZoneId.of("Asia/Seoul"));
        Query query = new Query(Criteria.where("projectId").is(projectId));
        Update update = new Update().set("thumbnail", imageUrl)
            .set("lastUpdateTime", currentTime);
        // 업데이트 실행 및 결과 반환
        UpdateResult result = mongoTemplate.updateFirst(query, update, ProjectEntity.class);
        // 업데이트 성공 여부 확인 (수정된 문서 수가 0보다 크면 true 반환)
        result.getModifiedCount();
    }

    public boolean checkProjectId(Long projectId) {
        Optional<ProjectEntity> project = repository.findById(projectId);
        return project.isPresent();
    }
}
