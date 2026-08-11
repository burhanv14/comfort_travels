package com.comforttravels.controller;

import com.comforttravels.dto.EnquiryRequest;
import com.comforttravels.service.EnquiryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/enquiries")
@RequiredArgsConstructor
public class EnquiryController {
    private final EnquiryService svc;

    @PostMapping
    public ResponseEntity<Void> create(@Valid @RequestBody EnquiryRequest req) {
        svc.create(req);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}