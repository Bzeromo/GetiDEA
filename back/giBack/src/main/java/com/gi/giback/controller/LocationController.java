package com.gi.giback.controller;

import com.gi.giback.dto.BookmarkDTO;
import com.gi.giback.dto.LocationDTO;
import com.gi.giback.dto.LocationMoveDTO;
import com.gi.giback.mongo.entity.ProjectEntity;
import com.gi.giback.mongo.service.ProjectService;
import com.gi.giback.mysql.entity.FolderEntity;
import com.gi.giback.mysql.entity.LocationEntity;
import com.gi.giback.mysql.service.FolderService;
import com.gi.giback.mysql.service.LocationService;
import com.gi.giback.mysql.service.UserService;
import com.gi.giback.response.ErrorResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/location")
@CrossOrigin
@Tag(name = "로케이션 컨트롤러", description = "로케이션 관련 컨트롤러 (북마크 포함)")
public class LocationController {

    private final LocationService locationService;
    private final UserService userService;
    private final FolderService folderService;
    private final ProjectService projectService;

    @Autowired
    public LocationController(LocationService locationService, UserService userService,
        FolderService folderService, ProjectService projectService) {
        this.locationService = locationService;
        this.userService = userService;
        this.folderService = folderService;
        this.projectService = projectService;
    }

    @PostMapping("/invite") // 유저 초대시 로케이션 생성
    @Operation(summary = "프로젝트에 유저 초대 - 테스트 완료", description = "프로젝트에 유저 초대 -> 초대받은 유저 정보를 기반으로 location 엔티티 생성")
    public ResponseEntity<?> inviteUser(
            @RequestBody @Parameter(description = "초대할 userEmail, 초대 프로젝트 ID") LocationDTO data) {
        // 이 작업은 프로젝트 내부에서 실행되므로 projectId 정보가 클라이언트에 있다는 것을 가정

        Optional<ProjectEntity> project = projectService.getProject(data.getProjectId());
        if (project.isPresent()){
            String userName = null;
            userName = userService.getUserNameByEmail(data.getUserEmail());
            if (userName != null) { // 사용자가 없으면 실행하지 않음
                LocationEntity createdEntity = locationService.createLocation(data.getUserEmail(),
                    data.getProjectId(), project.get().getProjectName(), "GetIdeaMain");
                if(createdEntity == null){
                    return ResponseEntity.badRequest().body(new ErrorResponse("이미 초대된 사용자입니다."));
                }
                return ResponseEntity.ok(createdEntity);
            }
        }
        return ResponseEntity.badRequest().body(new ErrorResponse("유저 초대에 실패하였습니다."));
    }

    @PutMapping("/move") // 프로젝트를 디폴트에서 폴더로 지정시키면 폴더 이름을 바꿔줌
    @Operation(summary = "프로젝트 위치 이동 - 테스트 완료", description = "프로젝트 위치 이동 : 로케이션에 있는 folderName 변경")
    public ResponseEntity<?> updateFolderName(
            @RequestBody @Parameter(description = "사용자 이메일, 이동시킬 프로젝트, 이동할 폴더 이름")LocationMoveDTO data) {

        Optional<FolderEntity> folder = folderService.getFolderByFolderName(data.getUserEmail(), data.getNewFolderName());
        if(folder.isPresent()){
            LocationEntity updatedEntity = locationService.updateFolderName(data);
            return ResponseEntity.ok(updatedEntity);
        }
        return ResponseEntity.badRequest().body(new ErrorResponse("프로젝트 이동 실패"));
    }

    @PutMapping("/bookmark") // 북마크 해제, 등록
    @Operation(summary = "북마크 - 테스트 완료", description = "북마크 해제, 등록 기능 구현")
    public ResponseEntity<?> toggleBookmark(
            @RequestBody @Parameter(description = "북마크 기능 사용할 프로젝트id") BookmarkDTO bookmark,
        @AuthenticationPrincipal String userEmail) {

        Long projectId = bookmark.getProjectId();

        if(userEmail == null || userEmail.equals("anonymousUser")){
            return ResponseEntity.badRequest().body(new ErrorResponse("사용자 검증 필요"));
        }
        LocationEntity updatedEntity = locationService.toggleBookmark(projectId, userEmail);
        return ResponseEntity.ok(updatedEntity);
    }
}
