package com.comforttravels.dto;

import lombok.*;
import java.time.LocalDateTime;

@Value @Builder
public class BlogDto {
    Long id;
    String slug;
    String title;
    String content;
    String coverImage;
    LocalDateTime publishedAt;
    String authorName;
}