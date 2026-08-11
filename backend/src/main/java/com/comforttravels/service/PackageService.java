package com.comforttravels.service;

import com.comforttravels.dto.PackageDto;
import com.comforttravels.mapper.PackageMapper;
import com.comforttravels.repository.TravelPackageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PackageService {
    private final TravelPackageRepository repo;
    private final PackageMapper mapper;

    public List<PackageDto> getAll() {
        return mapper.toDto(repo.findAll());
    }

    public List<PackageDto> getPopular() {
        return mapper.toDto(repo.findByPopularTrue());
    }

    public java.util.Optional<PackageDto> getBySlug(String slug) {
        return repo.findBySlug(slug).map(mapper::toDto);
    }
}