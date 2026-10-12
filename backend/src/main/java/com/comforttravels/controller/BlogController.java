package com.comforttravels.controller;

import com.comforttravels.dto.BlogDto;
import com.comforttravels.service.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blogs")
@RequiredArgsConstructor
public class BlogController {
    private final BlogService svc;

    @GetMapping
    public List<BlogDto> all() {
        return svc.getAll();
    }

    @GetMapping("/{slug}")
    public ResponseEntity<BlogDto> bySlug(@PathVariable String slug) {
        return svc.getBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<BlogDto> create(@RequestBody BlogDto dto) {
        BlogDto created = svc.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{slug}")
    public ResponseEntity<BlogDto> update(@PathVariable String slug, @RequestBody BlogDto dto) {
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