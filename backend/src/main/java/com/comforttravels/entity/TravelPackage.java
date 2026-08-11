package com.comforttravels.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

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

    String description;

    String imageUrl;

    @Column(name = "price_usd")
    BigDecimal price;

    @Column(name = "duration_days")
    int durationDays;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "destination_id")
    Destination destination;

    @Column(name = "is_popular")
    boolean popular;
}