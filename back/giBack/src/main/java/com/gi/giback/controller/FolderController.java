package com.gi.giback.controller;

import com.gi.giback.dto.FolderNameDTO;
import com.gi.giback.mysql.entity.FolderEntity;
import com.gi.giback.mysql.service.FolderService;
import com.gi.giback.response.ErrorResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/folder")
@Tag(name = "폴더 컨트롤러 - 테스트 완료", description = "폴더 관련 컨트롤러")
@CrossOrigin
@Slf4j
public class FolderController {

    private final FolderService folderService;

    @Autowired
    public FolderController(FolderService folderService) {
        this.folderService = folderService;
    }

    @PostMapping("/create")
    @Operation(summary = "사용자별 폴더 생성 - 테스트 완료", description = "사용자의 폴더 생성")
    public ResponseEntity<?> createFolder(@RequestBody String folderName,
        @AuthenticationPrincipal String userEmail) {
        if(userEmail == null || userEmail.equals("anonymousUser")){
            return ResponseEntity.badRequest().body(new ErrorResponse("사용자 검증 필요"));
        }

        if(folderService.checkDuplicateFolder(userEmail, folderName)) {
            return ResponseEntity.badRequest().body(new ErrorResponse("폴더 이름이 중복되었습니다."));
        } // 중복 폴더 체크

        FolderEntity result = folderService.createFolder(folderName, userEmail);
        if (result == null)
            return ResponseEntity.badRequest().body(new ErrorResponse("폴더 생성에 실패하였습니다."));
        return ResponseEntity.ok(result);
    }

    @GetMapping("/search")
    @Operation(summary = "사용자별 폴더 검색 - 테스트 완료", description = "사용자의 폴더 검색")
    public ResponseEntity<?> getFoldersByUserEmail(@AuthenticationPrincipal String userEmail) {
        if(userEmail == null || userEmail.equals("anonymousUser")){
            return ResponseEntity.badRequest().body(new ErrorResponse("사용자 검증 필요"));
        }
        return ResponseEntity.ok(folderService.getFoldersByUserEmail(userEmail));
    }

    @DeleteMapping("/remove/{folderName}")
    @Operation(summary = "폴더 삭제 - 테스트 완료", description = "폴더 삭제시 내부 프로젝트도 삭제됨")
    public ResponseEntity<?> deleteFolder(@PathVariable("folderName") String folderName,
        @AuthenticationPrincipal String userEmail) {

        if(userEmail == null || userEmail.equals("anonymousUser")){
            return ResponseEntity.badRequest().body(new ErrorResponse("사용자 검증 필요"));
        }
        Optional<FolderEntity> folderEntity = folderService.checkFolder(userEmail, folderName);
        if(folderEntity.isPresent()){
            Long folderId = folderEntity.get().getFolderId();
            folderService.deleteFolder(folderId);
            return ResponseEntity.ok("폴더 삭제 성공");
        }
        return ResponseEntity.badRequest().body(new ErrorResponse("폴더 삭제 실패"));
    }

    @PatchMapping("/rename")
    @Operation(summary = "폴더 이름 변경 - 테스트 완료", description = "폴더 이름 변경")
    public ResponseEntity<?> updateFolderName(
            @RequestBody FolderNameDTO data, @AuthenticationPrincipal String userEmail) {

        if(userEmail == null || userEmail.equals("anonymousUser")){
            return ResponseEntity.badRequest().body(new ErrorResponse("사용자 검증 필요"));
        }

        if(folderService.checkDuplicateFolder(userEmail, data.getNewFolderName())) {
            return ResponseEntity.badRequest().body(new ErrorResponse("중복된 폴더 입니다."));
        } // 중복 폴더 체크

        if(folderService.checkFolder(userEmail, data.getBeforeFolderName()).isPresent()) {
            FolderEntity entity = folderService.updateFolderName(data, userEmail);
            if(entity != null) {
                return ResponseEntity.ok(entity);
            }
        }
        return ResponseEntity.badRequest().body(new ErrorResponse("폴더 이름 변경에 실패하였습니다."));
    }
}
