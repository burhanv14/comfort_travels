package com.comforttravels;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class ComfortTravelsApplication {
    public static void main(String[] args) {
        SpringApplication.run(ComfortTravelsApplication.class, args);
    }
}