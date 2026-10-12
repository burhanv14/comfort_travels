package com.comforttravels.service;

import com.comforttravels.dto.EnquiryRequest;
import com.comforttravels.repository.TravelPackageRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class EnquiryServiceTest {

    @Mock
    private EmailService emailService;

    @Mock
    private TravelPackageRepository packageRepository;

    private EnquiryEmailFormatter emailFormatter;
    private EnquiryService enquiryService;

    @BeforeEach
    void setUp() {
        emailFormatter = new EnquiryEmailFormatter();
        enquiryService = new EnquiryService(emailService, emailFormatter, packageRepository);
    }

    @Test
    void testCreateEnquiryTriggersEmail() {
        EnquiryRequest req = EnquiryRequest.builder()
                .type(EnquiryRequest.Type.PACKAGE)
                .name("Karan Johar")
                .email("karan@example.com")
                .phone("9876543210")
                .travellers(2)
                .travelDate("2026-10-20")
                .message("Luxury 5-star packages only")
                .build();

        enquiryService.create(req);

        // Verify emailService called
        ArgumentCaptor<String> subjectCaptor = ArgumentCaptor.forClass(String.class);
        ArgumentCaptor<String> replyToCaptor = ArgumentCaptor.forClass(String.class);
        ArgumentCaptor<String> htmlCaptor = ArgumentCaptor.forClass(String.class);
        ArgumentCaptor<String> textCaptor = ArgumentCaptor.forClass(String.class);

        verify(emailService, times(1)).sendEnquiryNotification(
                subjectCaptor.capture(),
                replyToCaptor.capture(),
                htmlCaptor.capture(),
                textCaptor.capture()
        );

        assertNotNull(subjectCaptor.getValue());
        assertEquals("karan@example.com", replyToCaptor.getValue());
        assertTrue(htmlCaptor.getValue().contains("Karan Johar"));
        assertTrue(textCaptor.getValue().contains("Karan Johar"));
    }
}
