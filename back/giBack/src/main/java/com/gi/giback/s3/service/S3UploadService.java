package com.gi.giback.s3.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import javax.imageio.ImageIO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@RequiredArgsConstructor
public class S3UploadService {

    private final AmazonS3Client amazonS3Client;

    @Value("${spring.cloud.aws.s3.bucket}")
    private String bucket;

    // 이미지 압축 메서드
    private ByteArrayInputStream resizeImage(MultipartFile multipartFile, int width, int height) throws IOException {
        BufferedImage originalImage = ImageIO.read(multipartFile.getInputStream());
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        Thumbnails.of(originalImage)
            .size(width, height)
            .outputFormat("JPEG") // 또는 원본 이미지의 포맷에 맞게 조정
            .toOutputStream(outputStream);
        return new ByteArrayInputStream(outputStream.toByteArray());
    }

    public String saveThumbnailImage(MultipartFile multipartFile) throws IOException {
        String originalFilename = multipartFile.getOriginalFilename();
        String filenameWithPath = "thumbnailImage/" + originalFilename;

        ByteArrayInputStream resizedImageStream = resizeImage(multipartFile, 400, 300);

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(multipartFile.getSize());
        metadata.setContentType(multipartFile.getContentType());

        amazonS3Client.putObject(bucket, filenameWithPath, resizedImageStream, metadata);
        return amazonS3Client.getUrl(bucket, filenameWithPath).toString();
    }

    public void deleteImage(String originalFilename)  {
        amazonS3Client.deleteObject(bucket, originalFilename);
    }

    public String saveProfileImage(MultipartFile multipartFile, String userId) throws IOException {
        String filenameWithPath = "profileImage/" + userId;

        ByteArrayInputStream resizedImageStream = resizeImage(multipartFile, 200, 200);

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(multipartFile.getSize());
        metadata.setContentType(multipartFile.getContentType());

        amazonS3Client.putObject(bucket, filenameWithPath, resizedImageStream, metadata);
        return amazonS3Client.getUrl(bucket, filenameWithPath).toString();
    }
}
