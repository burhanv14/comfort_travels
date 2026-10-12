package com.comforttravels.controller;

import com.comforttravels.dto.PackageDto;
import com.comforttravels.service.PackageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/packages")
@RequiredArgsConstructor
public class PackageController {
    private final PackageService svc;

    @GetMapping
    public List<PackageDto> all() {
        return svc.getAll();
    }

    @GetMapping("/homepage")
    public List<PackageDto> homepage() {
        return svc.getHomepage();
    }

    @GetMapping("/{slug}")
    public ResponseEntity<PackageDto> bySlug(@PathVariable String slug) {
        return svc.getBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<PackageDto> create(@RequestBody PackageDto dto) {
        PackageDto created = svc.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{slug}")
    public ResponseEntity<PackageDto> update(@PathVariable String slug, @RequestBody PackageDto dto) {
        return svc.update(slug, dto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{slug}")
    public ResponseEntity<Void> delete(@PathVariable String slug) {
        boolean deleted = svc.delete(slug);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}