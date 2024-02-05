package com.gi.giback.controller;

import com.gi.giback.mongo.entity.ProjectEntity;
import com.gi.giback.mongo.service.ProjectService;
import com.gi.giback.mysql.entity.FolderEntity;
import com.gi.giback.mysql.entity.LocationEntity;
import com.gi.giback.mysql.service.FolderService;
import com.gi.giback.mysql.service.LocationService;
import com.gi.giback.mysql.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/locations")
@CrossOrigin
@Tag(name = "로케이션 컨트롤러", description = "로케이션 관련 컨트롤러 (북마크 포함)")
public class LocationController {

    @Autowired
    private LocationService locationService;
    @Autowired
    private UserService userService;
    @Autowired
    private FolderService folderService;
    @Autowired
    private ProjectService projectService;

    @PostMapping("/invite") // 유저 초대시 로케이션 생성
    @Operation(summary = "프로젝트에 유저 초대", description = "프로젝트에 유저 초대 -> 초대받은 유저 정보를 기반으로 location 엔티티 생성")
    public ResponseEntity<LocationEntity> createLocation(
            @RequestParam @Parameter(description = "초대할 userEmail") String userEmail,
            @RequestParam @Parameter(description = "초대 프로젝트 ID") Long projectId) {
        // 이 작업은 프로젝트 내부에서 실행되므로 projectId 정보가 클라이언트에 있다는 것을 가정

        Optional<ProjectEntity> project = projectService.getProject(projectId);
        if (project.isPresent()){
            String userName = null;
            userName = userService.getUserNameByEmail(userEmail);
            if (userName != null) { // 사용자가 없으면 실행하지 않음
                LocationEntity createdEntity = locationService.createLocation(userEmail, projectId, project.get().getProjectName());
                return ResponseEntity.ok(createdEntity);
            }
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/updateFolderName") // 프로젝트를 디폴트에서 폴더로 지정시키면 폴더 이름을 바꿔줌
    @Operation(summary = "프로젝트 위치 이동", description = "프로젝트 위치 이동 : 로케이션에 있는 folderName 변경")
    public ResponseEntity<LocationEntity> updateFolderName(
            @RequestParam @Parameter(description = "사용자 이메일") String userEmail,
            @RequestParam @Parameter(description = "이동시킬 프로젝트") String projectName,
            @RequestParam @Parameter(description = "이동할 폴더 이름") String newFolderName) {

        Optional<FolderEntity> folder = folderService.getFolderByFolderName(newFolderName);
        if(folder.isPresent()){
            LocationEntity updatedEntity = locationService.updateFolderName(userEmail, projectName, newFolderName);
            return ResponseEntity.ok(updatedEntity);
        }
        return ResponseEntity.badRequest().build();
    }

    @PutMapping("/toggleBookmark") // 북마크 해제, 등록
    @Operation(summary = "북마크", description = "북마크 해제, 등록 기능 구현")
    public ResponseEntity<LocationEntity> toggleBookmark(
            @RequestParam @Parameter(description = "사용자 이메일") String userEmail,
            @RequestParam @Parameter(description = "북마크 기능 사용할 프로젝트id") Long projectId) {
        LocationEntity updatedEntity = locationService.toggleBookmark(userEmail, projectId);
        return ResponseEntity.ok(updatedEntity);
    }
}
