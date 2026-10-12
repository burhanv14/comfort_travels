package com.comforttravels.dto;

import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Value @Builder
public class BlogDto {
    Long id;
    String slug;
    String title;
    String excerpt;
    String content;
    String coverImage;
    String author;
    String category;
    List<String> tags;
    int readTime;
    boolean featured;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
}