package com.comforttravels.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "testimonials")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Testimonial {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(nullable = false)
    String author;

    String role;

    @Column(columnDefinition = "TEXT")
    String quote;

    Integer rating; // 1-5

    String avatarUrl;
}