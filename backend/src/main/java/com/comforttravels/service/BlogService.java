package com.comforttravels.service;

import com.comforttravels.dto.BlogDto;
import com.comforttravels.entity.Blog;
import com.comforttravels.mapper.BlogMapper;
import com.comforttravels.repository.BlogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BlogService {
    private final BlogRepository repo;
    private final BlogMapper mapper;

    public List<BlogDto> getAll() {
        return mapper.toDto(repo.findAll());
    }

    public java.util.Optional<BlogDto> getBySlug(String slug) {
        return repo.findBySlug(slug).map(mapper::toDto);
    }

    public BlogDto create(BlogDto dto) {
        Blog entity = mapper.toEntity(dto);
        Blog saved = repo.save(entity);
        return mapper.toDto(saved);
    }

    public java.util.Optional<BlogDto> update(String slug, BlogDto dto) {
        return repo.findBySlug(slug).map(existing -> {
            Blog updated = mapper.toEntity(dto);
            updated.setId(existing.getId());
            updated.setCreatedAt(existing.getCreatedAt());
            Blog saved = repo.save(updated);
            return mapper.toDto(saved);
        });
    }

    public boolean delete(String slug) {
        return repo.findBySlug(slug).map(entity -> {
            repo.delete(entity);
            return true;
        }).orElse(false);
    }
}