package com.gi.giback.controller;

import com.gi.giback.mongo.service.ProjectService;
import com.gi.giback.mysql.entity.FolderEntity;
import com.gi.giback.mysql.entity.LocationEntity;
import com.gi.giback.mysql.service.FolderService;
import com.gi.giback.mysql.service.LocationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/folder")
@Tag(name = "폴더 컨트롤러 - 테스트 완료", description = "폴더 관련 컨트롤러")
@CrossOrigin
public class FolderController {

    @Autowired
    private FolderService folderService;
    @Autowired
    private LocationService locationService;
    @Autowired
    private ProjectService projectService;

    @PostMapping("/create")
    @Operation(summary = "사용자별 폴더 생성", description = "사용자의 폴더 생성")
    public FolderEntity createFolder(@RequestBody FolderEntity folder) {
        return folderService.createFolder(folder);
    }

    @GetMapping("/{userEmail}")
    @Operation(summary = "사용자별 폴더 검색", description = "사용자의 폴더 검색")
    public List<FolderEntity> getFoldersByUserEmail(@PathVariable("userEmail") @Parameter(description = "사용자 이메일") String userEmail) {
        return folderService.getFoldersByUserEmail(userEmail);
    }

    @DeleteMapping("/{userEmail}/{folderName}")
    @Operation(summary = "폴더 삭제", description = "폴더 삭제시 내부 프로젝트도 삭제됨")
    public ResponseEntity<?> deleteFolder(
            @PathVariable("userEmail") @Parameter(description = "사용자 이메일") String userEmail,
            @PathVariable("folderName") @Parameter(description = "삭제 폴더 이름") String folderName) {
        List<LocationEntity> locationEntityList = locationService.getLocationsByUserEmailAndFolderName(userEmail, folderName);

        for (LocationEntity location : locationEntityList) {
            Long pid = location.getProjectId();

            locationService.deleteLocationByUserEmailAndProjectId(userEmail, pid);
            long count = locationService.countLocationsByProjectId(pid);

            if (count == 0) {
                projectService.deleteProjectByProjectId(pid);
            }
        }

        folderService.deleteFolder(userEmail, folderName);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/update")
    @Operation(summary = "폴더 이름 변경", description = "폴더 이름 변경")
    public FolderEntity updateFolderName(
            @RequestParam String userEmail,
            @RequestParam String oldFolderName,
            @RequestParam String newFolderName) {
        return folderService.updateFolderName(userEmail, oldFolderName, newFolderName);
    }
}
