package com.comforttravels.controller;

import com.comforttravels.dto.PackageDto;
import com.comforttravels.service.PackageService;
import lombok.RequiredArgsConstructor;
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

    @GetMapping("/popular")
    public List<PackageDto> popular() {
        return svc.getPopular();
    }

    @GetMapping("/{slug}")
    public ResponseEntity<PackageDto> bySlug(@PathVariable String slug) {
        return svc.getBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}