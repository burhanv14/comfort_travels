package com.comforttravels.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "packages")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class TravelPackage {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(nullable = false, unique = true)
    String slug;

    @Column(nullable = false)
    String title;

    @Column(columnDefinition = "TEXT")
    String description;

    @Column(name = "short_description", columnDefinition = "TEXT")
    String shortDescription;

    @Enumerated(EnumType.STRING)
    Category category;

    String duration;

    // Images
    @ElementCollection
    @CollectionTable(name = "package_images", joinColumns = @JoinColumn(name = "package_id"))
    @Column(name = "image_url")
    List<String> images;

    @Column(name = "cover_image")
    String coverImage;
    // SEO fields
    @Column(name = "meta_title")
    String metaTitle;

    @Column(name = "meta_description", columnDefinition = "TEXT")
    String metaDescription;

    @Column(name = "meta_keywords", columnDefinition = "TEXT")
    String metaKeywords;

    // Status & visibility
    @Column(name = "is_active")
    boolean active;

    @Column(name = "show_on_homepage")
    boolean showOnHomepage;

    // Location details
    @Column(name = "destination")
    String destination;

    @Column(name = "start_location")
    String startLocation;

    @Column(name = "end_location")
    String endLocation;


    // Difficulty & physical rating
    @Enumerated(EnumType.STRING)
    Difficulty difficulty;

    @Enumerated(EnumType.STRING)
    PhysicalRating physicalRating;

    // Group size
    @Column(name = "min_group_size")
    int minGroupSize;

    @Column(name = "max_group_size")
    int maxGroupSize;

    // Age restrictions
    @Column(name = "min_age")
    Integer minAge;

    @Column(name = "max_age")
    Integer maxAge;

    // Accommodation & meals
    String accommodation;

    String meals;

    String transport;

    // Cancellation & booking policies
    @Column(name = "cancellation_policy", columnDefinition = "TEXT")
    String cancellationPolicy;

    @Column(name = "booking_policy", columnDefinition = "TEXT")
    String bookingPolicy;

    @Column(name = "free_cancellation")
    Boolean freeCancellation;

    @Column(name = "cancellation_days_before")
    Integer cancellationDaysBefore;

    // Itinerary
    @OneToMany(mappedBy = "travelPackage", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @OrderBy("day ASC")
    List<ItineraryDay> itinerary;

    // Inclusions & Exclusions
    @ElementCollection
    @CollectionTable(name = "package_inclusions", joinColumns = @JoinColumn(name = "package_id"))
    @Column(name = "inclusion")
    List<String> inclusions;

    @ElementCollection
    @CollectionTable(name = "package_exclusions", joinColumns = @JoinColumn(name = "package_id"))
    @Column(name = "exclusion")
    List<String> exclusions;

    // FAQs
    @ElementCollection
    @CollectionTable(name = "package_faqs", joinColumns = @JoinColumn(name = "package_id"))
    List<FAQ> faqs;

    // Highlights
    @ElementCollection
    @CollectionTable(name = "package_highlights", joinColumns = @JoinColumn(name = "package_id"))
    @Column(name = "highlight")
    List<String> highlights;

    // Reviews & ratings (summary)
    @Column(name = "average_rating")
    Double averageRating;

    @Column(name = "review_count")
    Integer reviewCount;

    // Timestamps
    @Column(name = "created_at", updatable = false)
    LocalDateTime createdAt;

    @Column(name = "updated_at")
    LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
        if (updatedAt == null) {
            updatedAt = LocalDateTime.now();
        }
        if (difficulty == null) {
            difficulty = Difficulty.EASY;
        }
        if (physicalRating == null) {
            physicalRating = PhysicalRating.LOW;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public enum Category {
        ADVENTURE, FAMILY, HONEYMOON, PILGRIMAGE, LUXURY, BUDGET, WILDLIFE, BEACH, HILL_STATION, CULTURAL
    }

    public enum Difficulty {
        EASY, MODERATE, CHALLENGING, EXTREME
    }

    public enum PhysicalRating {
        LOW, MODERATE, HIGH, VERY_HIGH
    }

    @Embeddable
    @Data @NoArgsConstructor @AllArgsConstructor @Builder
    public static class FAQ {
        String question;
        String answer;
    }
}