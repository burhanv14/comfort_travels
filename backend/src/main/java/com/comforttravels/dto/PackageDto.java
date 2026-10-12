package com.comforttravels.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Value @Builder
public class PackageDto {
    Long id;
    String slug;
    String title;
    String description;
    String shortDescription;
    Category category;
    String duration;

    // Images
    List<String> images;
    String coverImage;

    // SEO fields
    String metaTitle;
    String metaDescription;
    String metaKeywords;

    // Status & visibility
    boolean active;
    boolean showOnHomepage;

    // Location details
    String destination;
    String startLocation;
    String endLocation;

    // Difficulty & physical rating
    Difficulty difficulty;
    PhysicalRating physicalRating;

    // Group size
    int minGroupSize;
    int maxGroupSize;

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

    // Itinerary
    List<ItineraryDay> itinerary;

    // Inclusions & Exclusions
    List<String> inclusions;
    List<String> exclusions;

    // FAQs
    List<FAQ> faqs;

    // Highlights
    List<String> highlights;

    // Reviews & ratings (summary)
    Double averageRating;
    Integer reviewCount;

    // Timestamps
    LocalDateTime createdAt;
    LocalDateTime updatedAt;

    public enum Category {
        ADVENTURE, FAMILY, HONEYMOON, PILGRIMAGE, LUXURY, BUDGET, WILDLIFE, BEACH, HILL_STATION, CULTURAL;

        @JsonCreator
        public static Category fromString(String value) {
            if (value == null || value.trim().isEmpty()) {
                return ADVENTURE;
            }
            try {
                return Category.valueOf(value.trim().toUpperCase().replace("-", "_").replace(" ", "_"));
            } catch (IllegalArgumentException e) {
                return ADVENTURE;
            }
        }

        @JsonValue
        public String toJson() {
            return name().toLowerCase().replace("_", "-");
        }
    }

    public enum Difficulty {
        EASY, MODERATE, CHALLENGING, EXTREME;

        @JsonCreator
        public static Difficulty fromString(String value) {
            if (value == null || value.trim().isEmpty()) {
                return EASY;
            }
            try {
                return Difficulty.valueOf(value.trim().toUpperCase());
            } catch (IllegalArgumentException e) {
                return EASY;
            }
        }

        @JsonValue
        public String toJson() {
            return name().toLowerCase();
        }
    }

    public enum PhysicalRating {
        LOW, MODERATE, HIGH, VERY_HIGH;

        @JsonCreator
        public static PhysicalRating fromString(String value) {
            if (value == null || value.trim().isEmpty()) {
                return MODERATE;
            }
            try {
                return PhysicalRating.valueOf(value.trim().toUpperCase().replace("-", "_"));
            } catch (IllegalArgumentException e) {
                return MODERATE;
            }
        }

        @JsonValue
        public String toJson() {
            return name().toLowerCase().replace("_", "-");
        }
    }

    @Value @Builder
    public static class ItineraryDay {
        Long id;
        int day;
        String title;
        String description;
        List<String> activities;
        String accommodation;
        String meals;
        String transport;
    }

    @Value @Builder
    public static class FAQ {
        String question;
        String answer;
    }
}