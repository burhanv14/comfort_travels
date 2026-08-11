package com.comforttravels.service;

import com.comforttravels.dto.EnquiryRequest;
import com.comforttravels.entity.Enquiry;
import com.comforttravels.repository.EnquiryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class EnquiryService {
    private final EnquiryRepository repo;

    @Transactional
    public Enquiry create(EnquiryRequest req) {
        Enquiry e = Enquiry.builder()
                .name(req.getName())
                .email(req.getEmail())
                .phone(req.getPhone())
                .message(req.getMessage())
                .createdAt(LocalDateTime.now())
                .build();
        return repo.save(e);
    }
}