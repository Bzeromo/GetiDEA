package com.gi.giback.controller;

import com.gi.giback.mongo.service.ProjectService;
import com.gi.giback.mysql.service.UserService;
import com.gi.giback.s3.service.S3UploadService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/image")
@RequiredArgsConstructor
@CrossOrigin
@Tag(name = "이미지 컨트롤러 - 테스트 완료", description = "S3 이미지 저장 컨트롤러")
public class ImageController {

    private final S3UploadService s3UploadService;
    private final UserService userService;
    private final ProjectService projectService;

    @PostMapping("/thumbnailImage")
    @Operation(summary = "썸네일 이미지 저장", description = "썸네일 이미지 저장")
    public ResponseEntity<String> uploadThumbnailImage(
        @RequestParam("Image") @Parameter(description = "저장할 이미지") MultipartFile multipartFile,
        @RequestParam("projectId") Long projectId) {
        String result;
        try {
            result = s3UploadService.saveThumbnailImage(multipartFile);
            projectService.updateProjectThumbnail(projectId, result);
        } catch (IOException e) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(result);
    }

    @PostMapping("/profileImage")
    @Operation(summary = "프로필 이미지 변경", description = "프로필 이미지 변경")
    public ResponseEntity<String> updateProfileImage(
        @RequestParam("Image") @Parameter(description = "저장할 이미지") MultipartFile multipartFile,
        @RequestParam("userEmail") @Parameter(description = "사용자 이메일") String userEmail) {

        String result;
        try {
            result = s3UploadService.saveProfileImage(multipartFile, userEmail);
            if(userService.updateUserProfileImage(userEmail, result)){
                return ResponseEntity.ok(result);
            }
        } catch (IOException e) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.badRequest().build();
    }
}