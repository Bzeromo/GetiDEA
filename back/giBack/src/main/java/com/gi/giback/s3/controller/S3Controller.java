package com.gi.giback.s3.controller;

import com.gi.giback.s3.service.S3UploadService;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/image")
@RequiredArgsConstructor
public class S3Controller {

    private final S3UploadService s3UploadService;

    @PostMapping("/thumbnailImage")
    public ResponseEntity<String> uploadThumbnailImage(@RequestParam("thumbnailImage") MultipartFile multipartFile) {
        String result;
        try {
            result = s3UploadService.saveThumbnailImage(multipartFile);
        } catch (IOException e) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(result);
    }

    @PostMapping("/userId/profileImage")
    public ResponseEntity<String> updateProfileImage(@RequestParam("userId") String userId,
        @RequestParam("profileImage") MultipartFile multipartFile) {

        String result;
        try {
            result = s3UploadService.saveProfileImage(multipartFile, userId);
        } catch (IOException e) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(result);
    }
}
