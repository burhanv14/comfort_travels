package com.comforttravels.service;

import com.comforttravels.dto.BlogDto;
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
}