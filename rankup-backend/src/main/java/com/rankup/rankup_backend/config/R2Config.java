package com.rankup.rankup_backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;

import java.net.URI;

@Configuration
public class R2Config {

    @Bean
    public S3Client r2S3Client(
            @Value("${app.r2.endpoint}") String endpoint,
            @Value("${app.r2.access-key}") String accessKey,
            @Value("${app.r2.secret-key}") String secretKey
    ) {
        return S3Client.builder()
                .endpointOverride(URI.create(endpoint))
                .credentialsProvider(
                        StaticCredentialsProvider.create(AwsBasicCredentials.create(accessKey, secretKey))
                )
                .region(Region.US_EAST_1) // R2 ignores region but SDK requires one
                .build();
    }

    @Bean
    public S3Presigner r2Presigner(
            @Value("${app.r2.endpoint}") String endpoint,
            @Value("${app.r2.access-key}") String accessKey,
            @Value("${app.r2.secret-key}") String secretKey
    ) {
        return S3Presigner.builder()
                .endpointOverride(URI.create(endpoint))
                .credentialsProvider(
                        StaticCredentialsProvider.create(AwsBasicCredentials.create(accessKey, secretKey))
                )
                .region(Region.US_EAST_1)
                .build();
    }
}
