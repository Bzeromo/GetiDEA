package com.gi.giback.controller;

import com.gi.giback.dto.FolderDTO;
import com.gi.giback.dto.FolderNameDTO;
import com.gi.giback.mongo.service.ProjectService;
import com.gi.giback.mysql.entity.FolderEntity;
import com.gi.giback.mysql.entity.LocationEntity;
import com.gi.giback.mysql.service.FolderService;
import com.gi.giback.mysql.service.LocationService;
import com.gi.giback.mysql.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
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
@Slf4j
public class FolderController {

    private final FolderService folderService;
    private final LocationService locationService;
    private final ProjectService projectService;
    private final UserService userService;

    @Autowired
    public FolderController(FolderService folderService, LocationService locationService,
        ProjectService projectService, UserService userService) {
        this.folderService = folderService;
        this.locationService = locationService;
        this.projectService = projectService;
        this.userService = userService;
    }

    @PostMapping("/create")
    @Operation(summary = "사용자별 폴더 생성 - 테스트 완료", description = "사용자의 폴더 생성")
    public ResponseEntity<FolderEntity> createFolder(@RequestBody FolderDTO data) {

        FolderEntity result = folderService.createFolder(data);
        if (result == null)
            return ResponseEntity.badRequest().build();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/search")
    @Operation(summary = "사용자별 폴더 검색 - 테스트 완료", description = "사용자의 폴더 검색")
    public ResponseEntity<List<FolderEntity>> getFoldersByUserEmail(@RequestParam @Parameter(description = "사용자 이메일") String userEmail) {
        return ResponseEntity.ok(folderService.getFoldersByUserEmail(userEmail));
    }

    @DeleteMapping("/remove")
    @Operation(summary = "폴더 삭제 - 테스트 완료", description = "폴더 삭제시 내부 프로젝트도 삭제됨")
    public ResponseEntity<?> deleteFolder(@RequestBody FolderDTO data) {

        folderService.deleteFolder(data);
        return ResponseEntity.ok("delete folder");
    }

    @PatchMapping("/rename")
    @Operation(summary = "폴더 이름 변경 - 테스트 완료", description = "폴더 이름 변경")
    public ResponseEntity<FolderEntity> updateFolderName(
            @RequestBody FolderNameDTO data) {

        if(folderService.checkFolder(data.getUserEmail(), data.getBeforeFolderName()))
            return ResponseEntity.ok(folderService.updateFolderName(data));
        else
            return ResponseEntity.badRequest().build();
    }
}
