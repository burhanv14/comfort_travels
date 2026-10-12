package com.comforttravels.repository;

import com.comforttravels.entity.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface BlogRepository extends JpaRepository<Blog, Long> {
    List<Blog> findByFeaturedTrue();
    List<Blog> findByCategory(String category);
    Optional<Blog> findBySlug(String slug);
}