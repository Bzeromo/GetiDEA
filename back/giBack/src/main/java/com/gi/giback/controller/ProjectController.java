package com.gi.giback.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.gi.giback.mongo.entity.ProjectEntity;
import com.gi.giback.mongo.entity.TemplateEntity;
import com.gi.giback.mongo.service.ProjectService;
import com.gi.giback.mongo.service.TemplateService;
import com.gi.giback.mysql.entity.LocationEntity;
import com.gi.giback.mysql.service.LocationService;
import com.gi.giback.redis.dto.ProjectData;
import com.gi.giback.redis.dto.RedisProjectDto;
import com.gi.giback.redis.service.RedisService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/project")
@Tag(name = "프로젝트 컨트롤러", description = "프로젝트 관련 컨트롤러")
@CrossOrigin
public class ProjectController {

    @Autowired
    private RedisService redisService;
    @Autowired
    private ProjectService projectService;
    @Autowired
    private TemplateService templateService;
    @Autowired
    private LocationService locationService;

    // 새 프로젝트 생성시 호출 코드
    @PostMapping("/{projectId}/{projectName}/{templateId}/{userEmail}")
    @Operation(summary = "새 프로젝트 생성 (Mongo)", description = "몽고 DB에 새 프로젝트 데이터 저장 후 프로젝트 정보 반환")
    public ResponseEntity<?> makeProject(
            @PathVariable("projectId") @Parameter(description = "생성 프로젝트 ID") String projectId,
            @PathVariable("projectName") @Parameter(description = "생성 프로젝트 Name") String projectName,
            @PathVariable("templateId") @Parameter(description = "참조 템플릿 ID") String templateId,
            @PathVariable("userEmail") @Parameter(description = "생성한 사용자 email") String userEmail) {

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

            locationService.createLocation(userEmail, projectId); // 로케이션에도 넣어줌

            if (projectService.addProject(project))
                return ResponseEntity.ok().build();
        }
        // template에서 정보 가져와서 project entity 만들어주고 DB에 저장

        return ResponseEntity.badRequest().build();
        // 요청 실패시 badRequest
    }

    // 기존 프로젝트 실행시 호출
    @GetMapping("/data/{projectId}/{userCount}")
    @Operation(summary = "기존 프로젝트 열기 (Mongo)", description = "Redis에 임시 저장된 데이터 와 MongoDB 병합 후 MongoDB에 있는 Project 데이터 반환")
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
    @Operation(summary = "변경사항 저장 (Redis)", description = "작업 진행중 변경사항 Redis에 임시 저장")
    public ResponseEntity<?> saveData(@RequestBody @Parameter(description = "프로젝트 변경 데이터(작업 전, 후) JSON") RedisProjectDto data)
            throws JsonProcessingException {
        redisService.saveData(data);
        return ResponseEntity.ok().build();
    }

    // redis에서 project 데이터 받아와서 mongo에 넣어줌
    @PatchMapping("/{projectId}")
    @Operation(summary = "프로젝트 병합 - 사용자의 프로젝트 저장, 퇴장, 참여 => 호출", description = "Redis에 저장되어있는 임시 데이터와 MongoDB의 프로젝트 데이터를 병합 작업 수행")
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

    @DeleteMapping("/{userEmail}/{projectId}")
    @Operation(summary = "프로젝트 삭제", description = "프로젝트 1개만 삭제")
    public ResponseEntity<?> deleteProject(
            @PathVariable("userEmail") @Parameter(description = "사용자 이메일") String userEmail,
            @PathVariable("projectId") @Parameter(description = "삭제 프로젝트 ID") String projectId) {

        Optional<LocationEntity> entity = locationService.getLocationByProjectIdAndUserEmail(projectId, userEmail);
        if(entity.isPresent()) {

            locationService.deleteLocationByUserEmailAndProjectId(userEmail, projectId);
            long count = locationService.countLocationsByProjectId(projectId);

            if (count == 0) {
                projectService.deleteProjectByProjectId(projectId);
            }

            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/{userEmail}") // 유저 이메일 기반으로 모든 참여되어있는 모든 프로젝트 가져오기
    @Operation(summary = "전체 프로젝트 불러오기", description = "사용자의 모든 프로젝트 불러오기")
    public ResponseEntity<List<ProjectEntity>> getProjectListByEmail(@PathVariable("userEmail") @Parameter(description = "사용자 Email") String userEmail){
        List<LocationEntity> locationEntityList = locationService.getLocationEntityByUserEmail(userEmail);
        List<ProjectEntity> projectEntityList = new ArrayList<>();
        if(!locationEntityList.isEmpty()) {
            int size = locationEntityList.size();

            for (int i=0; i<size; i++) {
                String projectId = locationEntityList.get(i).getProjectId();
                Optional<ProjectEntity> entity = projectService.getProject(projectId);
                if(entity.isPresent()){
                    projectEntityList.add(entity.get());
                }
            }
            return ResponseEntity.ok(projectEntityList);
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/recent/{userEmail}") // 유저 이메일 기반으로 모든 참여되어있는 모든 프로젝트 중 최근 7일
    @Operation(summary = "최근 프로젝트 불러오기 (7일)", description = "사용자의 모든 프로젝트 중 최근 7일 불러오기")
    public ResponseEntity<List<ProjectEntity>> getRecentProjectListByEmail(@PathVariable("userEmail") String userEmail){
        List<LocationEntity> locationEntityList = locationService.getLocationEntityByUserEmail(userEmail);
        List<ProjectEntity> projectEntityList = new ArrayList<>();

        for (LocationEntity locationEntity : locationEntityList) {
            String projectId = locationEntity.getProjectId();
            projectService.getProjectByIdWithDay(projectId).ifPresent(projectEntityList::add);
        }

        if (!projectEntityList.isEmpty()) {
            return ResponseEntity.ok(projectEntityList);
        } else {
            return ResponseEntity.noContent().build(); // 프로젝트가 없을 경우 No Content 상태 코드 반환
        }
    }

    @GetMapping("/recent2/{userEmail}")
    @Operation(summary = "최근 프로젝트 불러오기 (2개)", description = "사용자의 모든 프로젝트 중 최근 2개 불러오기")
    public ResponseEntity<List<ProjectEntity>> getMostRecentProjectListByEmail(@PathVariable("userEmail") String userEmail){
        List<LocationEntity> locationEntityList = locationService.getLocationEntityByUserEmail(userEmail);
        List<ProjectEntity> projectEntityList = new ArrayList<>();

        // 위치 정보를 바탕으로 프로젝트 조회
        for (LocationEntity locationEntity : locationEntityList) {
            String projectId = locationEntity.getProjectId();
            projectService.getProjectByIdWithDay(projectId).ifPresent(projectEntityList::add);
        }

        // 프로젝트를 lastUpdateTime 기준으로 내림차순 정렬
        List<ProjectEntity> sortedProjectEntityList = projectEntityList.stream()
            .sorted(Comparator.comparing(ProjectEntity::getLastUpdateTime).reversed())
            .limit(2) // 최근 업데이트된 상위 2개 프로젝트만 선택
            .collect(Collectors.toList());

        if (!sortedProjectEntityList.isEmpty()) {
            return ResponseEntity.ok(sortedProjectEntityList);
        } else {
            return ResponseEntity.noContent().build(); // 프로젝트가 없을 경우 No Content 상태 코드 반환
        }
    }

    @GetMapping("/bookmarked/{userEmail}") // 북마크된 프로젝트 전체
    @Operation(summary = "북마크 된 프로젝트 전체 불러오기", description = "사용자의 모든 프로젝트 중 북마크 되어있는 프로젝트")
    public ResponseEntity<List<ProjectEntity>> getBookmarkedLocations(@PathVariable String userEmail) {
        List<LocationEntity> bookmarkedLocations = locationService.getBookmarkedLocations(userEmail);
        List<ProjectEntity> projectEntityList = new ArrayList<>();

        for (LocationEntity locationEntity : bookmarkedLocations) {
            String projectId = locationEntity.getProjectId();
            projectService.getProjectByIdWithDay(projectId).ifPresent(projectEntityList::add);
        }

        if (!projectEntityList.isEmpty()) {
            return ResponseEntity.ok(projectEntityList);
        } else {
            return ResponseEntity.noContent().build(); // 프로젝트가 없을 경우 No Content 상태 코드 반환
        }
    }

    @GetMapping("/{userEmail}/{folderName}") // 유저이메일 + 폴더네임으로 가져온 프로젝트 데이터
    @Operation(summary = "폴더에 있는 프로젝트 전체 불러오기", description = "사용자의 특정 폴더 내부에 있는 프로젝트 전달")
    public ResponseEntity<List<ProjectEntity>> getBookmarkedLocations(@PathVariable String userEmail, @PathVariable String folderName) {
        List<LocationEntity> locations = locationService.getLocationsByUserEmailAndFolderName(userEmail, folderName);
        List<ProjectEntity> projectEntityList = new ArrayList<>();

        for (LocationEntity locationEntity : locations) {
            String projectId = locationEntity.getProjectId();
            projectService.getProjectByIdWithDay(projectId).ifPresent(projectEntityList::add);
        }

        if (!projectEntityList.isEmpty()) {
            return ResponseEntity.ok(projectEntityList);
        } else {
            return ResponseEntity.noContent().build(); // 프로젝트가 없을 경우 No Content 상태 코드 반환
        }
    }

    @PutMapping("/updateName") // 로케이션에서 사용자 확인 후 프로젝트id 기준으로 프로젝트 이름 변경
    @Operation(summary = "프로젝트 이름 변경 - 프로젝트 ID 정보 어떻게할지 구상 필요", description = "프로젝트 이름 변경")
    public ResponseEntity<?> updateProjectName(
        @RequestParam @Parameter(description = "사용자 ID") String userEmail,
        @RequestParam @Parameter(description = "프로젝트 ID") String projectId,
        @RequestParam @Parameter(description = "새로운 프로젝트 이름") String newProjectName) {
        Optional<LocationEntity> location = locationService.getLocationByProjectIdAndUserEmail(projectId, userEmail);

        if (location.isPresent()) {
            Optional<ProjectEntity> updatedProject = projectService.updateProjectName(projectId, newProjectName);
            return updatedProject
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/rollback/{projectId}/{userEmail}") // 되돌리기 기능을 위한 User별 변동사항 호출
    @Operation(summary = "이전 변경사항 불러오기 - 되돌리기 기능(Ctrl + z)", description = "userEmail과 projectId를 받아서 레디스의 임시데이터에서 최근 변경한 내용을 호출")
    public ResponseEntity<Object> getUserData(@PathVariable("projectId") String projectId, @PathVariable("userEmail") String userEmail) {
        Object data = redisService.getLastProjectData(projectId, userEmail);
        return ResponseEntity.ok(data);
    }
}
