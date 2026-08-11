package com.comforttravels.dto;

import lombok.*;

import java.math.BigDecimal;

@Value @Builder
public class PackageDto {
    Long id;
    String slug;
    String title;
    String description;
    String imageUrl;
    BigDecimal price;
    int durationDays;
    DestinationDto destination;
    boolean popular;
}