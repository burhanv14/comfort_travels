package com.comforttravels.dto;

import lombok.*;

@Value @Builder
public class TestimonialDto {
    Long id;
    String author;
    String role;
    String quote;
    Integer rating;
    String avatarUrl;
}