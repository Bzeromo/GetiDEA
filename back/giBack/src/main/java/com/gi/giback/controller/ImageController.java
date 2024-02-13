package com.gi.giback.controller;

import com.gi.giback.dto.FileUploadDTO;
import com.gi.giback.mongo.service.ProjectService;
import com.gi.giback.mysql.service.UserService;
import com.gi.giback.response.ErrorResponse;
import com.gi.giback.s3.S3UploadService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/image")
@RequiredArgsConstructor
@CrossOrigin
@Slf4j
@Tag(name = "이미지 컨트롤러 - 테스트 완료", description = "S3 이미지 저장 컨트롤러")
public class ImageController {

    private final S3UploadService s3UploadService;
    private final UserService userService;
    private final ProjectService projectService;

    @PostMapping("/thumbnail")
    @Operation(summary = "썸네일 이미지 저장", description = "썸네일 이미지 저장")
    public ResponseEntity<?> uploadThumbnailImage(
        @RequestPart("Image")  MultipartFile multipartFile,
        @RequestPart("projectId") Long projectId) {
        String result;
        try {
            result = s3UploadService.saveThumbnailImage(multipartFile);
            projectService.updateProjectThumbnail(projectId, result);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse("썸네일 변경 실패"));
        }
        return ResponseEntity.ok(result);
    }

    @PostMapping("/profile")
    @Operation(summary = "프로필 이미지 변경", description = "프로필 이미지 변경")
    public ResponseEntity<?> updateProfileImage(
        @RequestPart("Image") MultipartFile multipartFile,
        @AuthenticationPrincipal String userEmail) {

        if(userEmail == null || userEmail.equals("anonymousUser")){
            return ResponseEntity.badRequest().body(new ErrorResponse("사용자 검증 필요"));
        }

        String result;
        try {
            result = s3UploadService.saveProfileImage(multipartFile, userEmail);
            if(userService.updateUserProfileImage(userEmail, result)){
                return ResponseEntity.ok(result);
            }
        } catch (IOException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse("프로필 이미지 변경 실패 - IOException"));
        }
        return ResponseEntity.badRequest().body(new ErrorResponse("프로필 이미지 변경 실패"));
    }

    @PostMapping("/project")
    @Operation(summary = "프로젝트 이미지 추가", description = "프로젝트 내 삽입된 이미지 저장 후, 이미지 url 반환")
    public ResponseEntity<String> updateProfileImage(
        @RequestParam @Parameter(description = "imageBase64 : 인코딩된 이미지 ")FileUploadDTO fileUploadDTO) {

        String result;
        result = s3UploadService.saveImage(fileUploadDTO);
        return ResponseEntity.ok(result);
    }

}