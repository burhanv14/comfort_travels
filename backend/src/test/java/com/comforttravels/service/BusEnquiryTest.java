package com.comforttravels.service;

import com.comforttravels.dto.EnquiryRequest;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class BusEnquiryTest {

    @Test
    void testBusTypeDisplayTitle() {
        EnquiryEmailFormatter formatter = new EnquiryEmailFormatter();
        
        // Test display title for BUS type
        String title = formatter.getDisplayTypeTitle(EnquiryRequest.Type.BUS);
        assertEquals("Bus Travel Enquiry", title);
    }
    
    @Test
    void testBusTypeFromString() {
        // Test various inputs that should map to BUS
        assertEquals(EnquiryRequest.Type.BUS, EnquiryRequest.Type.fromString("bus"));
        assertEquals(EnquiryRequest.Type.BUS, EnquiryRequest.Type.fromString("Bus"));
        assertEquals(EnquiryRequest.Type.BUS, EnquiryRequest.Type.fromString("BUS"));
        assertEquals(EnquiryRequest.Type.BUS, EnquiryRequest.Type.fromString("BUSES"));
    }
    
    @Test
    void testBusEnquiryFormatting() {
        EnquiryEmailFormatter formatter = new EnquiryEmailFormatter();
        
        EnquiryRequest req = EnquiryRequest.builder()
                .type(EnquiryRequest.Type.BUS)
                .name("Test User")
                .email("test@example.com")
                .phone("1234567890")
                .from("Mumbai")
                .to("Pune")
                .travelDate("2026-12-25")
                .travelClass("AC Sleeper")
                .build();
        
        String text = formatter.formatPlainTextMessage(req);
        String html = formatter.formatHtmlMessage(req);
        
        // Check plain text contains correct title
        assertTrue(text.contains("BUS TRAVEL ENQUIRY"), "Plain text should contain BUS TRAVEL ENQUIRY");
        assertTrue(text.contains("Bus Travel Enquiry"), "Plain text should contain Bus Travel Enquiry");
        
        // Check HTML contains correct title
        assertTrue(html.contains("Bus Travel Enquiry"), "HTML should contain Bus Travel Enquiry");
        
        // Check specific bus details
        assertTrue(text.contains("Mumbai -> Pune"), "Should contain route");
        assertTrue(text.contains("AC Sleeper"), "Should contain bus type");
        assertTrue(html.contains("Mumbai &rarr; Pune"), "HTML should contain route");
        assertTrue(html.contains("AC Sleeper"), "HTML should contain bus type");
    }
}