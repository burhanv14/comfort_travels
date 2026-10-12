package com.comforttravels.service;

import com.comforttravels.dto.PackageDto;
import com.comforttravels.entity.TravelPackage;
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

    public List<PackageDto> getHomepage() {
        return mapper.toDto(repo.findByShowOnHomepageTrue());
    }

    public java.util.Optional<PackageDto> getBySlug(String slug) {
        return repo.findBySlug(slug).map(mapper::toDto);
    }

    public PackageDto create(PackageDto dto) {
        TravelPackage entity = mapper.toEntity(dto);
        TravelPackage saved = repo.save(entity);
        return mapper.toDto(saved);
    }

    public java.util.Optional<PackageDto> update(String slug, PackageDto dto) {
        return repo.findBySlug(slug).map(existing -> {
            // update fields from dto
            TravelPackage updated = mapper.toEntity(dto);
            updated.setId(existing.getId()); // preserve id
            updated.setCreatedAt(existing.getCreatedAt());
            TravelPackage saved = repo.save(updated);
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