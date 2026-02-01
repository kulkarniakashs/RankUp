package com.rankup.rankup_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.TimeZone;

@SpringBootApplication
public class RankupBackendApplication {

	public static void main(String[] args) {
		TimeZone.setDefault(TimeZone.getTimeZone("ASIA/KOLKATA"));
		SpringApplication.run(RankupBackendApplication.class, args);
	}

}
