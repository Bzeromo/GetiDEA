package com.gi.giback.socket;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.gi.giback.mongo.dto.ChatMessage;
import com.gi.giback.mongo.entity.ProjectEntity;
import com.gi.giback.mongo.entity.TemplateEntity;
import com.gi.giback.mongo.service.ChatService;
import com.gi.giback.mongo.service.ProjectService;
import com.gi.giback.mongo.service.TemplateService;
import com.gi.giback.redis.dto.ProjectData;
import com.gi.giback.redis.dto.RedisProjectDto;
import com.gi.giback.redis.service.RedisService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController("/project")
@Tag(name = "Front-Back 요청", description = "프론트에서 백으로 요청 (Redis, Mongo) // 아직 MySQL에서 가져오는 부분x - 현승아 빨리해라")
public class SocketController {

    @Autowired
    private RedisService redisService;
    @Autowired
    private ProjectService projectService;
    @Autowired
    private TemplateService templateService;
    @Autowired
    private ChatService chatService;

    // 새 프로젝트 생성시 호출 코드
    @PostMapping("/{projectId}/{projectName}/{templateId}")
    @Operation(summary = "새 프로젝트 생성", description = "프로젝트 생성 후 프로젝트 정보 반환")
    public ResponseEntity<?> makeProject(
        @PathVariable("projectId") @Parameter(description = "생성 프로젝트 ID") String projectId,
        @PathVariable("projectName") @Parameter(description = "생성 프로젝트 Name") String projectName,
        @PathVariable("templateId") @Parameter(description = "참조 템플릿 ID") String templateId) {

        ProjectEntity project = new ProjectEntity();
        Optional<TemplateEntity> templateTmp = templateService.getTemplate(templateId);

        if (templateTmp.isPresent()) { //template 객체 확인
            TemplateEntity template = templateTmp.get();

            project.setProjectId(projectId);
            project.setProjectName(projectName);
            project.setTemplateId(templateId);
            project.setThumbnail(template.getThumbnail());
            project.setLastUpdateTime(LocalDateTime.now(ZoneId.of("Asia/Seoul")));
            project.setData(template.getData());
            if (projectService.addProject(project))
                return ResponseEntity.ok().build();
        }
        // template에서 정보 가져와서 project entity 만들어주고 DB에 저장

        return ResponseEntity.badRequest().build();
        // 요청 실패시 badRequest
    }

    // 기존 프로젝트 실행시 호출
    @GetMapping("/data/{projectId}/{userCount}")
    @Operation(summary = "기존 프로젝트 열기", description = "Redis에 저장된 데이터 Mongo와 병합 후 Mongo에 있는 Project 데이터 반환")
    public ResponseEntity<ProjectEntity> getProject(@PathVariable("projectId") @Parameter(description ="참여 프로젝트 ID") String projectId,
        @PathVariable("userCount") @Parameter(description = "프로젝트 현재 인원") int userCount) {

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

    @PostMapping("/changes")// Redis에 변경사항 저장
    @Operation(summary = "변경사항 저장", description = "작업 진행중 변경사항 Redis에 저장")
    public ResponseEntity<?> saveData(@RequestBody RedisProjectDto data)
        throws JsonProcessingException {
        redisService.saveData(data);
        return ResponseEntity.ok().build();
    }

    // redis에서 project 데이터 받아와서 mongo에 넣어줌
    @PatchMapping("/{projectId}")
    @Operation(summary = "프로젝트 병합 - 사용자의 프로젝트 퇴장, 참여시 호출 필요", description = "병합 작업 수행")
    public ResponseEntity<?> saveProject(@PathVariable("projectId") @Parameter(description = "병합 작업 진행할 프로젝트 ID") String projectId)
        throws JsonProcessingException {
        // projectId 기준으로 모든 데이터 가져옴
        List<ProjectData> redisData = redisService.getAllDataProject(projectId);

        if(projectService.updateData(projectId, redisData))
            return ResponseEntity.ok().build();
        else
            return ResponseEntity.badRequest().build();
    }

    @DeleteMapping("/close/{projectId}/{userId}")
    @Operation(summary = "프로젝트 나가기", description = "작업중인 프로젝트에서 나갈 경우 남은 인원에 따라 Redis와 Mongo 데이터 저장, 삭제")
    public ResponseEntity<?> closeProject(@PathVariable("projectId") @Parameter(description = "퇴장 프로젝트 ID") String projectId,
        @PathVariable("userId") @Parameter(description = "퇴장 사용자 ID") String userId) {

        try { // 종료시 병합 먼저 실행 => 병합코드를 front에서 호출해야함
            List<ProjectData> redisData = redisService.getAllDataProject(projectId);
            if(!projectService.updateData(projectId, redisData))
                return ResponseEntity.badRequest().build();
        } 
        catch (JsonProcessingException e) {
            return ResponseEntity.badRequest().build();
        }

        if(redisService.deleteData(projectId, userId))
            return ResponseEntity.ok().build();
        else
            return ResponseEntity.badRequest().build();

    }

    @PostMapping("/chat/{projectId}")
    @Operation(summary = "채팅 전송", description = "채팅 사용시 계속 호출해야함 / Mongo의 projectId가 일치하는 곳에 채팅 로그 저장")
    public ResponseEntity<Void> addChatMessage(@PathVariable("projectId") @Parameter(description = "채팅 저장할 프로젝트 ID") String projectId,
        @RequestBody ChatMessage chatMessage) {
        chatService.addChatLog(projectId, chatMessage);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/chat/{projectId}")
    @Operation(summary = "채팅 내역 불러오기", description = "프로젝트 실행시 프로젝트와 함께 채팅도 불러와야함")
    public ResponseEntity<List<ChatMessage>> getChatLogs(@PathVariable("projectId") @Parameter(description = "채팅 로그 불러올 프로젝트 ID") String projectId) {
        List<ChatMessage> chatLogs = chatService.getChatLogsByProjectId(projectId);
        return ResponseEntity.ok(chatLogs);
    }

}
