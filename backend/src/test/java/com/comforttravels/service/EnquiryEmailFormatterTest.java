package com.comforttravels.service;

import com.comforttravels.dto.EnquiryRequest;
import com.comforttravels.dto.PassengerDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class EnquiryEmailFormatterTest {

    private EnquiryEmailFormatter formatter;

    @BeforeEach
    void setUp() {
        formatter = new EnquiryEmailFormatter();
    }

    @Test
    void testSubjectGeneration() {
        EnquiryRequest req = EnquiryRequest.builder()
                .name("Rahul Sharma")
                .type(EnquiryRequest.Type.GENERAL)
                .build();
        assertEquals("Enquiry | Rahul Sharma", formatter.generateSubject(req));

        // When name is null but passenger list exists
        EnquiryRequest flightReq = EnquiryRequest.builder()
                .type(EnquiryRequest.Type.FLIGHT)
                .passengers(List.of(PassengerDto.builder().name("Amina Patel").build()))
                .build();
        assertEquals("Enquiry | Amina Patel", formatter.generateSubject(flightReq));

        // Package enquiry with package name
        EnquiryRequest pkgReq = EnquiryRequest.builder()
                .type(EnquiryRequest.Type.PACKAGE)
                .name("Priya Verma")
                .packageName("Kashmir Paradise 6D/5N")
                .build();
        assertEquals("Enquiry | Priya Verma - Kashmir Paradise 6D/5N", formatter.generateSubject(pkgReq));
    }

    @Test
    void testContactEnquiryFormatting() {
        EnquiryRequest req = EnquiryRequest.builder()
                .type(EnquiryRequest.Type.CONTACT)
                .name("John Doe")
                .email("john@example.com")
                .phone("+91 9876543210")
                .subject("Query about family tour customized options")
                .message("Can you provide details for a 5-day tour?")
                .build();

        String text = formatter.formatPlainTextMessage(req);
        String html = formatter.formatHtmlMessage(req);

        assertTrue(text.contains("CONTACT US ENQUIRY"));
        assertTrue(text.contains("John Doe"));
        assertTrue(text.contains("john@example.com"));
        assertTrue(text.contains("Query about family tour customized options"));
        assertTrue(text.contains("Can you provide details for a 5-day tour?"));

        assertTrue(html.contains("Contact Us Enquiry"));
        assertTrue(html.contains("John Doe"));
        assertTrue(html.contains("john@example.com"));
        assertTrue(html.contains("Query about family tour customized options"));
    }

    @Test
    void testPackageEnquiryFormatting() {
        EnquiryRequest req = EnquiryRequest.builder()
                .type(EnquiryRequest.Type.PACKAGE)
                .name("Priya Verma")
                .email("priya@example.com")
                .phone("+91 9988776655")
                .packageId("pkg-kashmir-01")
                .packageName("Kashmir Paradise 6D/5N")
                .travellers(4)
                .travelDate("2026-12-15")
                .budget("INR 1,50,000")
                .message("Need pure vegetarian food options")
                .build();

        String text = formatter.formatPlainTextMessage(req);
        String html = formatter.formatHtmlMessage(req);

        assertTrue(text.contains("HOLIDAY PACKAGE ENQUIRY"));
        assertTrue(text.contains("Kashmir Paradise 6D/5N"));
        assertTrue(text.contains("4"));
        assertTrue(text.contains("2026-12-15"));
        assertTrue(text.contains("INR 1,50,000"));

        assertTrue(html.contains("Holiday Package Enquiry"));
        assertTrue(html.contains("Kashmir Paradise 6D/5N"));
    }

    @Test
    void testFlightBookingFormatting() {
        EnquiryRequest req = EnquiryRequest.builder()
                .type(EnquiryRequest.Type.FLIGHT)
                .tripType("round-trip")
                .from("Mumbai (BOM)")
                .to("Dubai (DXB)")
                .departDate("2026-11-10")
                .returnDate("2026-11-20")
                .travelClass("business")
                .freeCancellation(true)
                .passengers(List.of(
                        PassengerDto.builder().name("Ali Khan").email("ali@example.com").phone("9876543210").age(34).sex("M").build(),
                        PassengerDto.builder().name("Sara Khan").email("sara@example.com").phone("9876543211").age(30).sex("F").build()
                ))
                .message("Need window seats if possible")
                .build();

        String text = formatter.formatPlainTextMessage(req);
        String html = formatter.formatHtmlMessage(req);

        assertTrue(text.contains("FLIGHT BOOKING ENQUIRY"));
        assertTrue(text.contains("Mumbai (BOM) -> Dubai (DXB)"));
        assertTrue(text.contains("round-trip"));
        assertTrue(text.contains("business"));
        assertTrue(text.contains("Free Cancellation Requested: Yes"));
        assertTrue(text.contains("Ali Khan"));
        assertTrue(text.contains("Sara Khan"));

        assertTrue(html.contains("Flight Booking Enquiry"));
        assertTrue(html.contains("Mumbai (BOM) &rarr; Dubai (DXB)"));
        assertTrue(html.contains("Ali Khan"));
        assertTrue(html.contains("Sara Khan"));
    }

    @Test
    void testTrainBookingFormatting() {
        EnquiryRequest req = EnquiryRequest.builder()
                .type(EnquiryRequest.Type.TRAIN)
                .from("New Delhi (NDLS)")
                .to("Varanasi (BSB)")
                .travelDate("2026-11-05")
                .travelClass("3A")
                .quota("GN")
                .preferredTrain("Vande Bharat Express (22436)")
                .passengers(List.of(
                        PassengerDto.builder().name("Suresh Gupta").email("suresh@example.com").phone("9123456780").age(45).sex("M").berthPreference("Lower").build()
                ))
                .build();

        String text = formatter.formatPlainTextMessage(req);
        String html = formatter.formatHtmlMessage(req);

        assertTrue(text.contains("TRAIN BOOKING ENQUIRY"));
        assertTrue(text.contains("New Delhi (NDLS) -> Varanasi (BSB)"));
        assertTrue(text.contains("Vande Bharat Express (22436)"));
        assertTrue(text.contains("Suresh Gupta"));
        assertTrue(text.contains("Berth: Lower"));

        assertTrue(html.contains("Train Booking Enquiry"));
        assertTrue(html.contains("New Delhi (NDLS) &rarr; Varanasi (BSB)"));
        assertTrue(html.contains("Suresh Gupta"));
    }

    @Test
    void testHotelBookingFormatting() {
        EnquiryRequest req = EnquiryRequest.builder()
                .type(EnquiryRequest.Type.HOTEL)
                .city("Goa")
                .checkIn("2026-12-24")
                .checkOut("2026-12-28")
                .rooms(2)
                .passengers(List.of(
                        PassengerDto.builder().name("Vikram Mehta").email("vikram@example.com").phone("9888877777").age(29).sex("M").build()
                ))
                .message("Require sea-facing rooms")
                .build();

        String text = formatter.formatPlainTextMessage(req);
        String html = formatter.formatHtmlMessage(req);

        assertTrue(text.contains("HOTEL RESERVATION ENQUIRY"));
        assertTrue(text.contains("Goa"));
        assertTrue(text.contains("2026-12-24"));
        assertTrue(text.contains("2026-12-28"));
        assertTrue(text.contains("Rooms: 2"));
        assertTrue(text.contains("Vikram Mehta"));

        assertTrue(html.contains("Hotel Reservation Enquiry"));
        assertTrue(html.contains("Goa"));
        assertTrue(html.contains("Vikram Mehta"));
    }

    @Test
    void testVisaServicesFormatting() {
        EnquiryRequest req = EnquiryRequest.builder()
                .type(EnquiryRequest.Type.VISA)
                .name("Ananya Sen")
                .email("ananya@example.com")
                .phone("+91 9777766666")
                .destinationCountry("United Kingdom")
                .visaType("Standard Visitor")
                .countryOfResidence("India")
                .nationality("Indian")
                .message("Planning to travel for tourism in July")
                .build();

        String text = formatter.formatPlainTextMessage(req);
        String html = formatter.formatHtmlMessage(req);

        assertTrue(text.contains("VISA SERVICES ENQUIRY"));
        assertTrue(text.contains("United Kingdom"));
        assertTrue(text.contains("Standard Visitor"));
        assertTrue(text.contains("India"));
        assertTrue(text.contains("Indian"));

        assertTrue(html.contains("Visa Services Enquiry"));
        assertTrue(html.contains("United Kingdom"));
        assertTrue(html.contains("Ananya Sen"));
    }
}