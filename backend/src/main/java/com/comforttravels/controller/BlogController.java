package com.comforttravels.controller;

import com.comforttravels.dto.BlogDto;
import com.comforttravels.service.BlogService;
import lombok.RequiredArgsConstructor;
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
}