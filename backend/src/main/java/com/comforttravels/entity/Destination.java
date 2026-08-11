package com.comforttravels.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "destinations")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Destination {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(nullable = false, unique = true)
    String slug;

    @Column(nullable = false)
    String name;

    String description;

    String imageUrl;

    @Column(name = "is_featured")
    boolean featured;
}