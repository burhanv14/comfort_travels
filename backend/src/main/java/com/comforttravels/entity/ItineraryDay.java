package com.comforttravels.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "itinerary_days")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class ItineraryDay {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    int day;

    String title;

    String description;

    @ElementCollection
    @CollectionTable(name = "itinerary_activities", joinColumns = @JoinColumn(name = "itinerary_day_id"))
    @Column(name = "activity")
    List<String> activities;

    String accommodation;
    String meals;
    String transport;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "package_id", nullable = false)
    TravelPackage travelPackage;
}