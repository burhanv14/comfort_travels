package com.comforttravels.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "blogs")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Blog {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(nullable = false, unique = true)
    String slug;

    @Column(nullable = false)
    String title;

    @Column(columnDefinition = "TEXT")
    String content;

    String coverImage;

    @Column(name = "published_at")
    LocalDateTime publishedAt;

    @Column(name = "author_name")
    String authorName;
}