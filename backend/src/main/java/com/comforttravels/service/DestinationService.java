package com.comforttravels.service;

import com.comforttravels.dto.DestinationDto;
import com.comforttravels.mapper.DestinationMapper;
import com.comforttravels.repository.DestinationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DestinationService {
    private final DestinationRepository repo;
    private final DestinationMapper mapper;

    public List<DestinationDto> getAll() {
        return mapper.toDto(repo.findAll());
    }

    public List<DestinationDto> getFeatured() {
        return mapper.toDto(repo.findByFeaturedTrue());
    }

    public java.util.Optional<DestinationDto> getBySlug(String slug) {
        return repo.findBySlug(slug).map(mapper::toDto);
    }
}