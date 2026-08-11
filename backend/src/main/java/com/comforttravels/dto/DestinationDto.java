package com.comforttravels.dto;

import lombok.*;

@Value @Builder
public class DestinationDto {
    Long id;
    String slug;
    String name;
    String description;
    String imageUrl;
    boolean featured;
}