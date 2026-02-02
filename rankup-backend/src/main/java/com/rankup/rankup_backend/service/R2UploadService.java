package com.rankup.rankup_backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PresignedPutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class R2UploadService {

    private final S3Presigner presigner;

    @Value("${app.r2.bucket}")
    private String bucket;

    public void validateImageContentType(String contentType) {
        if (contentType == null) throw new IllegalArgumentException("contentType required");
        String ct = contentType.toLowerCase();
        if (!(ct.equals("image/png") || ct.equals("image/jpeg") || ct.equals("image/webp"))) {
            throw new IllegalArgumentException("Only PNG/JPEG/WEBP allowed");
        }
    }

    public String presignPutUrl(String objectKey, String contentType) {
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucket)
                .key(objectKey)
                .contentType(contentType)
                .build();

        PutObjectPresignRequest presignRequest = PutObjectPresignRequest.builder()
                .signatureDuration(Duration.ofMinutes(15))
                .putObjectRequest(putObjectRequest)
                .build();

        PresignedPutObjectRequest presigned = presigner.presignPutObject(presignRequest);
        return presigned.url().toString();
    }
}
