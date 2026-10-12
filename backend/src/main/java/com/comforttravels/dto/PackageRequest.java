package com.comforttravels.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class PackageRequest {
    // Basic fields
    String slug;
    String title;
    String description;
    String shortDescription;
    String category;
    String duration;

    // SEO fields
    String metaTitle;
    String metaDescription;
    String metaKeywords;

    // Status & visibility
    Boolean active;
    Boolean showOnHomepage;

    // Location details
    String destination;
    String startLocation;
    String endLocation;

    // Difficulty & physical rating
    String difficulty;
    String physicalRating;

    // Group size
    Integer minGroupSize;
    Integer maxGroupSize;

    // Age restrictions
    Integer minAge;
    Integer maxAge;

    // Accommodation & meals
    String accommodation;
    String meals;
    String transport;

    // Cancellation & booking policies
    String cancellationPolicy;
    String bookingPolicy;
    Boolean freeCancellation;
    Integer cancellationDaysBefore;

    // Itinerary (JSON string)
    String itineraryJson;

    // Inclusions & Exclusions (comma-separated or JSON)
    String inclusionsJson;
    String exclusionsJson;

    // FAQs (JSON string)
    String faqsJson;

    // Highlights (JSON string)
    String highlightsJson;

    // File uploads
    MultipartFile coverImage;
    List<MultipartFile> images;
    List<MultipartFile> galleryImages;
}