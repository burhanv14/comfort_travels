package com.comforttravels.controller;

import com.comforttravels.dto.TestimonialDto;
import com.comforttravels.service.TestimonialService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/testimonials")
@RequiredArgsConstructor
public class TestimonialController {
    private final TestimonialService svc;

    @GetMapping
    public List<TestimonialDto> all() {
        return svc.getAll();
    }
}