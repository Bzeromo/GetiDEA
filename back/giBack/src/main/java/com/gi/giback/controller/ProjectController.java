package com.gi.giback.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.gi.giback.dto.ProjectCreationDTO;
import com.gi.giback.dto.ProjectInfoDTO;
import com.gi.giback.dto.ProjectRenameDTO;
import com.gi.giback.mongo.entity.ProjectEntity;
import com.gi.giback.mongo.service.ProjectService;
import com.gi.giback.mongo.service.TemplateService;
import com.gi.giback.mysql.entity.LocationEntity;
import com.gi.giback.mysql.service.LocationService;
import com.gi.giback.dto.ProjectProcessDTO;
import com.gi.giback.dto.ProjectInputDTO;
import com.gi.giback.redis.RedisService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
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
@Slf4j
public class ProjectController {

    private final RedisService redisService;
    private final ProjectService projectService;
    private final LocationService locationService;

    @Autowired
    public ProjectController(RedisService redisService, ProjectService projectService,
        LocationService locationService) {
        this.redisService = redisService;
        this.projectService = projectService;
        this.locationService = locationService;
    }

    // 새 프로젝트 생성시 호출 코드
    @PostMapping("/make")
    @Operation(summary = "새 프로젝트 생성 - 테스트 완료", description = "프로젝트 이름, 사용자 이메일, 참조 템플릿, 생성 위치(폴더 - 필수x) 를 받아 프로젝트 생성")
    public ResponseEntity<?> makeProject(@RequestBody ProjectCreationDTO projectCreationDto) {
        try {
            ProjectEntity project = projectService.createProject(projectCreationDto);
            if (project == null) {
                return ResponseEntity.badRequest().build();
            }
            return ResponseEntity.ok(project);
        } catch (Exception e) {
            // 로직 실행 중 발생한 예외 처리
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    // 기존 프로젝트 실행시 호출
    @GetMapping("/open")
    @Operation(summary = "기존 프로젝트 열기 (Mongo) - 테스트 완료", description = "Redis에 임시 저장된 데이터 와 MongoDB 병합 후 MongoDB에 있는 Project 데이터 반환")
    public ResponseEntity<ProjectEntity> getProject(
        @RequestParam @Parameter(description = "참여 프로젝트 Id") Long projectId)
        throws JsonProcessingException {

        if (!redisService.mergeProject(projectId)) { // 레디스에 데이터가 있을경우 병합
            return ResponseEntity.badRequest().build();
        }

        Optional<ProjectEntity> projectTmp = projectService.getProject(projectId);
        if (projectTmp.isPresent()) { //project 객체 확인
            ProjectEntity project = projectTmp.get();
            return ResponseEntity.ok(project);
        }
        return ResponseEntity.badRequest().build();
        // 여기에서 사용자한테 projectId 값도 같이 보내줌 -> 프로젝트 내부에서는 사용자가 projectId 값을 보유
    }

    @PostMapping("/change")// Redis에 변경사항 저장
    @Operation(summary = "변경사항 저장 (Redis) - 테스트 완료", description = "작업 진행중 변경사항 Redis에 임시 저장")
    public ResponseEntity<?> saveToRedis(@RequestBody @Parameter(description = "프로젝트 변경 데이터(작업 전, 후) JSON") ProjectInputDTO data)
            throws JsonProcessingException {

        redisService.saveData(data);
        return ResponseEntity.ok().build();
    }

    // redis에서 project 데이터 받아와서 mongo에 넣어줌
    @PatchMapping("/merge")
    @Operation(summary = "프로젝트 병합 - 사용자의 프로젝트 저장, 퇴장, 참여 => 호출", description = "Redis에 저장되어있는 임시 데이터와 MongoDB의 프로젝트 데이터를 병합 작업 수행")
    public ResponseEntity<?> saveProject(
        @RequestParam @Parameter(description = "병합 작업 진행할 프로젝트 ID") Long projectId)
            throws JsonProcessingException {

        if(redisService.mergeProject(projectId))
            return ResponseEntity.ok("merge project");
        else
            return ResponseEntity.badRequest().build();
    }

    @DeleteMapping("/close/{projectId}")
    @Operation(summary = "프로젝트 나가기 - 테스트 완료", description = "작업중인 프로젝트에서 나갈 경우 남은 인원에 따라 Redis와 Mongo 데이터 저장, 삭제")
    public ResponseEntity<?> closeProject(
        @PathVariable @Parameter(description = "퇴장 프로젝트 ID") Long projectId,
        @AuthenticationPrincipal String userEmail)
        throws JsonProcessingException {

        if(userEmail == null){
            return ResponseEntity.badRequest().build();
        }

        if (redisService.mergeProject(projectId)) {
            redisService.deleteData(projectId, userEmail);
            return ResponseEntity.ok("프로젝트 퇴장");
        }
        return ResponseEntity.badRequest().build();
    }

    @DeleteMapping("/delete/{projectId}")
    @Operation(summary = "프로젝트 삭제 - 테스트 완료", description = "프로젝트 1개만 삭제")
    public ResponseEntity<?> deleteProject(
        @PathVariable @Parameter(description = "삭제 프로젝트 ID") Long projectId,
        @AuthenticationPrincipal String userEmail) {

        if(userEmail == null){
            return ResponseEntity.badRequest().build();
        }

        locationService.deleteLocationByUserEmailAndProjectId(userEmail, projectId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/all") // 유저 이메일 기반으로 모든 참여되어있는 모든 프로젝트 가져오기
    @Operation(summary = "전체 프로젝트 불러오기 - 테스트 완료", description = "사용자의 모든 프로젝트 불러오기")
    public ResponseEntity<List<ProjectInfoDTO>> getProjectListByEmail(
        @AuthenticationPrincipal String userEmail) {

        if(userEmail == null){
            return ResponseEntity.badRequest().build();
        }

        List<LocationEntity> locationEntityList = locationService.getLocationEntityByUserEmail(userEmail);
        List<ProjectInfoDTO> projectInfoList = new ArrayList<>();
        if(!locationEntityList.isEmpty()) {
            int size = locationEntityList.size();

            for (int i=0; i<size; i++) {
                Long projectId = locationEntityList.get(i).getProjectId();
                Optional<ProjectInfoDTO> entity = projectService.getProjectInfo(projectId);
                entity.ifPresent(projectInfoList::add);
            }
            List<ProjectInfoDTO> sortedProjectEntityList = projectInfoList.stream()
                .sorted(Comparator.comparing(ProjectInfoDTO::getLastUpdateTime).reversed()).toList();
            return ResponseEntity.ok(sortedProjectEntityList);
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/recent") // 유저 이메일 기반으로 모든 참여되어있는 모든 프로젝트 중 최근 7일
    @Operation(summary = "최근 프로젝트 불러오기 (7일) - 테스트 완료", description = "사용자의 모든 프로젝트 중 최근 7일 불러오기 (갯수 지정 가능)")
    public ResponseEntity<List<ProjectInfoDTO>> getRecentProjectListByEmail(
        @AuthenticationPrincipal String userEmail, @RequestParam(required = false) Integer limit) {

        if(userEmail == null){
            return ResponseEntity.badRequest().build();
        }

        int projectsLimit = (limit == null) ? Integer.MAX_VALUE : limit;

        List<LocationEntity> locationEntityList = locationService.getLocationEntityByUserEmail(userEmail);
        List<ProjectInfoDTO> projectInfoList = new ArrayList<>();

        for (LocationEntity locationEntity : locationEntityList) {
            Long projectId = locationEntity.getProjectId();
            projectService.getProjectInfoByIdWithDay(projectId).ifPresent(projectInfoList::add);
        }

        List<ProjectInfoDTO> sortedProjectEntityList = projectInfoList.stream()
            .sorted(Comparator.comparing(ProjectInfoDTO::getLastUpdateTime).reversed())
            .limit(projectsLimit).toList();

        if (!projectInfoList.isEmpty()) {
            return ResponseEntity.ok(sortedProjectEntityList);
        } else {
            return ResponseEntity.noContent().build(); // 프로젝트가 없을 경우 No Content 상태 코드 반환
        }
    }

    @GetMapping("/bookmarked") // 북마크된 프로젝트 전체
    @Operation(summary = "북마크 된 프로젝트 전체 불러오기 - 테스트 완료", description = "사용자의 모든 프로젝트 중 북마크 되어있는 프로젝트")
    public ResponseEntity<List<ProjectInfoDTO>> getBookmarkedLocations(
        @AuthenticationPrincipal String userEmail) {

        if(userEmail == null){
            return ResponseEntity.badRequest().build();
        }

        List<ProjectInfoDTO> bookmarkedProject = locationService.getBookmarkedLocations(userEmail);

        if (!bookmarkedProject.isEmpty()) {
            return ResponseEntity.ok(bookmarkedProject);
        } else {
            return ResponseEntity.noContent().build(); // 프로젝트가 없을 경우 No Content 상태 코드 반환
        }
    }

    @GetMapping("/folder") // 유저이메일 + 폴더네임으로 가져온 프로젝트 데이터
    @Operation(summary = "폴더에 있는 프로젝트 전체 불러오기 - 테스트 완료", description = "사용자의 특정 폴더 내부에 있는 프로젝트 전달")
    public ResponseEntity<List<ProjectInfoDTO>> getBookmarkedLocations(
        @AuthenticationPrincipal String userEmail, @RequestParam String folderName) {

        if(userEmail == null){
            return ResponseEntity.badRequest().build();
        }

        List<LocationEntity> locations = locationService.getLocationsByUserEmailAndFolderName(userEmail, folderName);
        List<ProjectInfoDTO> projectInfoList = new ArrayList<>();

        for (LocationEntity locationEntity : locations) {
            Long projectId = locationEntity.getProjectId();
            projectService.getProjectInfo(projectId).ifPresent(projectInfoList::add);
        }

        if (!projectInfoList.isEmpty()) {
            return ResponseEntity.ok(projectInfoList);
        } else {
            return ResponseEntity.noContent().build(); // 프로젝트가 없을 경우 No Content 상태 코드 반환
        }
    }

    @PatchMapping("/rename") // 로케이션에서 사용자 확인 후 프로젝트id 기준으로 프로젝트 이름 변경
    @Operation(summary = "프로젝트 이름 변경 - 테스트 완료", description = "프로젝트 이름 변경")
    public ResponseEntity<ProjectEntity> updateProjectName(
        @AuthenticationPrincipal String userEmail,
        @RequestBody @Parameter(description = "프로젝트 ID, 새로운 프로젝트 이름")ProjectRenameDTO projectRenameDTO) {

        if(userEmail == null){
            return ResponseEntity.badRequest().build();
        }

        Long projectId = projectRenameDTO.getProjectId();
        String newProjectName = projectRenameDTO.getNewProjectName();

        Optional<LocationEntity> location = locationService.getLocationByProjectIdAndUserEmail(projectId, userEmail);

        if (location.isPresent()) {
            LocationEntity entity = locationService.updateProjectName(projectId, newProjectName); // 로케이션에 저장된 이름
            if(entity != null) {
                Optional<ProjectEntity> updatedProject = projectService.updateProjectName(projectId,
                    newProjectName); // 몽고DB에 저장된 이름
                return updatedProject
                    .map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
            }
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/rollback") // 되돌리기 기능을 위한 User별 변동사항 호출
    @Operation(summary = "이전 변경사항 불러오기 - 되돌리기 기능(Ctrl + z)", description = "userEmail과 projectId를 받아서 레디스의 임시데이터에서 최근 변경한 내용을 호출")
    public ResponseEntity<Object> getUserData(
        @RequestParam Long projectId, @AuthenticationPrincipal String userEmail) {

        if(userEmail == null){
            return ResponseEntity.badRequest().build();
        }

        Object data = redisService.getLastProjectData(projectId, userEmail);
        return ResponseEntity.ok(data);
    }
}
