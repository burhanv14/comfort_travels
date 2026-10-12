package com.comforttravels.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

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

    String excerpt;

    @Column(columnDefinition = "TEXT")
    String content;

    @Column(name = "cover_image")
    String coverImage;

    String author;

    String category;

    @ElementCollection
    @CollectionTable(name = "blog_tags", joinColumns = @JoinColumn(name = "blog_id"))
    @Column(name = "tag")
    List<String> tags;

    @Column(name = "read_time")
    int readTime;

    boolean featured;

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
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}