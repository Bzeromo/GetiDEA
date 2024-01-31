package com.gi.giback.socket;

import com.gi.giback.mongo.entity.ProjectEntity;
import com.gi.giback.mongo.entity.TemplateEntity;
import com.gi.giback.mongo.service.ProjectService;
import com.gi.giback.mongo.service.TemplateService;
import com.gi.giback.redis.dto.ProjectData;
import com.gi.giback.redis.dto.RedisProjectDto;
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
public class socketController {

    @Autowired
    private RedisService redisService;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private TemplateService templateService;

    // 새 프로젝트 생성시 호출 코드
    @GetMapping("/{projectId}/{projectName}/{templateId}")
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
    @GetMapping("/{projectId}")
    public ResponseEntity<ProjectEntity> getProject(@PathVariable("projectId") String projectId) {
        ProjectEntity project = new ProjectEntity();
        Optional<ProjectEntity> projectTmp = projectService.getProject(projectId);

        if (projectTmp.isPresent()) { //project 객체 확인
            project = projectTmp.get();
        }

        return ResponseEntity.ok(project);
    }

    @PostMapping("/{projectId}")
    public ResponseEntity<?> saveProject(@PathVariable("projectId") String projectId) {
        List<ProjectData> redisData = redisService.getAllDataProject(projectId);

        if(projectService.updateData(projectId, redisData))
            return ResponseEntity.ok().build();
        else
            return ResponseEntity.badRequest().build();
    }

}
