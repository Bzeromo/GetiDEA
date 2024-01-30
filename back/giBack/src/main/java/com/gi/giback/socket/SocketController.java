package com.gi.giback.socket;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.gi.giback.mongo.entity.ProjectEntity;
import com.gi.giback.mongo.entity.TemplateEntity;
import com.gi.giback.mongo.service.ProjectService;
import com.gi.giback.mongo.service.TemplateService;
import com.gi.giback.redis.dto.ProjectData;
import com.gi.giback.redis.service.RedisService;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("/project")
public class SocketController {

    @Autowired
    private RedisService redisService;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private TemplateService templateService;

    // 새 프로젝트 생성시 호출 코드
    @GetMapping("/make/{projectId}/{projectName}/{templateId}")
    public ResponseEntity<ProjectEntity> makeProject(@PathVariable("projectId") String projectId,
        @PathVariable("projectName") String projectName,
        @PathVariable("templateId") String templateId) {

        ProjectEntity project = new ProjectEntity();
        Optional<TemplateEntity> templateTmp = templateService.getTemplate(templateId);

        if (templateTmp.isPresent()) { //template 객체 확인
            TemplateEntity template = templateTmp.get();

            project.setProjectId(projectId);
            project.setProjectName(projectName);
            project.setTemplateId(templateId);
            project.setThumbnail(template.getThumbnail());
            project.setLasUpdateTime(LocalDateTime.now());
            project.setData(template.getData());
            projectService.addProject(project);
        }
        // template에서 정보 가져와서 project entity 만들어주고 DB에 저장

        return ResponseEntity.ok(project);
    }

    // 기존 프로젝트 실행시 호출
    @GetMapping("/open/{projectId}/{userCount}")
    public ResponseEntity<ProjectEntity> getProject(@PathVariable("projectId") String projectId,
        @PathVariable("userCount") int userCount) {

        ProjectEntity project = new ProjectEntity();

        if (userCount == 1) // 최초 1인이 들어왔을 경우
        {
            Optional<ProjectEntity> projectTmp = projectService.getProject(projectId);
            if (projectTmp.isPresent()) { //project 객체 확인
                project = projectTmp.get();
            }
            return ResponseEntity.ok(project);
        } else {
            // 2인 이상일 경우 merge -> send
            try {
                List<ProjectData> redisData = redisService.getAllDataProject(projectId);

                if (projectService.updateData(projectId, redisData)) {
                    Optional<ProjectEntity> projectTmp = projectService.getProject(projectId);
                    if (projectTmp.isPresent()) { //project 객체 확인
                        project = projectTmp.get();
                    }
                    return ResponseEntity.ok(project);
                } else {
                    return ResponseEntity.badRequest().build();
                }

            } catch (JsonProcessingException e) {
                return ResponseEntity.badRequest().build();
            }
        }
    }

    // redis에서 project 데이터 받아와서 mongo에 넣어줌
    @PostMapping("/merge/{projectId}")
    public ResponseEntity<?> saveProject(@PathVariable("projectId") String projectId)
        throws JsonProcessingException {
        // projectId 기준으로 모든 데이터 가져옴
        List<ProjectData> redisData = redisService.getAllDataProject(projectId);

        if(projectService.updateData(projectId, redisData))
            return ResponseEntity.ok().build();
        else
            return ResponseEntity.badRequest().build();
    }

    @PostMapping("/close/{projectId}/{userId}/{userCount}")
    public ResponseEntity<?> closeProject(@PathVariable("projectId") String projectId,
        @PathVariable("userId") String userId,
        @PathVariable("userCount") int userCount) {

        try { // 종료시 병합 먼저 실행
            List<ProjectData> redisData = redisService.getAllDataProject(projectId);
            if(!projectService.updateData(projectId, redisData))
                return ResponseEntity.badRequest().build();
        } 
        catch (JsonProcessingException e) {
            return ResponseEntity.badRequest().build();
        }

        if (userCount == 0) { // userCount가 0이면 이제 남은 유저가 없는것 프로젝트 데이터전체 삭제
            if(redisService.deleteAllDataByProjectId(projectId))
                return ResponseEntity.ok().build();
            else
                return ResponseEntity.badRequest().build();
        }
        else { // userCount 1이상이면 유저 남았으니 나간 유저의 것만 종료
            if(redisService.deleteData(projectId, userId))
                return ResponseEntity.ok().build();
            else
                return ResponseEntity.badRequest().build();
        }

    }

}
