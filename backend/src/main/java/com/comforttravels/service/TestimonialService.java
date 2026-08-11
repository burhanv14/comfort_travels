package com.comforttravels.service;

import com.comforttravels.dto.TestimonialDto;
import com.comforttravels.mapper.TestimonialMapper;
import com.comforttravels.repository.TestimonialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TestimonialService {
    private final TestimonialRepository repo;
    private final TestimonialMapper mapper;

    public List<TestimonialDto> getAll() {
        return mapper.toDto(repo.findAllByOrderByRatingDesc());
    }
}