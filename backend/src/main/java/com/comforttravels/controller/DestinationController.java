package com.comforttravels.controller;

import com.comforttravels.dto.DestinationDto;
import com.comforttravels.service.DestinationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/destinations")
@RequiredArgsConstructor
public class DestinationController {
    private final DestinationService svc;

    @GetMapping
    public List<DestinationDto> all() {
        return svc.getAll();
    }

    @GetMapping("/featured")
    public List<DestinationDto> featured() {
        return svc.getFeatured();
    }

    @GetMapping("/{slug}")
    public ResponseEntity<DestinationDto> bySlug(@PathVariable String slug) {
        return svc.getBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}