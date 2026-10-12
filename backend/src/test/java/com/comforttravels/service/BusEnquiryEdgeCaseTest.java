package com.comforttravels.service;

import com.comforttravels.dto.EnquiryRequest;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class BusEnquiryEdgeCaseTest {

    @Test
    void testBusTypeFromStringEdgeCases() {
        EnquiryEmailFormatter formatter = new EnquiryEmailFormatter();
        
        // Test various inputs that might come from frontend
        // These should all map to BUS
        assertEquals(EnquiryRequest.Type.BUS, EnquiryRequest.Type.fromString("bus"), "lowercase bus");
        assertEquals(EnquiryRequest.Type.BUS, EnquiryRequest.Type.fromString("Bus"), "capitalized Bus");
        assertEquals(EnquiryRequest.Type.BUS, EnquiryRequest.Type.fromString("BUS"), "uppercase BUS");
        assertEquals(EnquiryRequest.Type.BUS, EnquiryRequest.Type.fromString("BUSES"), "plural BUSES");
        
        // These might NOT map to BUS and fall back to GENERAL
        EnquiryRequest.Type busTravel = EnquiryRequest.Type.fromString("bus travel");
        System.out.println("'bus travel' maps to: " + busTravel + " -> title: " + formatter.getDisplayTypeTitle(busTravel));
        
        EnquiryRequest.Type busEnquiry = EnquiryRequest.Type.fromString("bus_enquiry");
        System.out.println("'bus_enquiry' maps to: " + busEnquiry + " -> title: " + formatter.getDisplayTypeTitle(busEnquiry));
        
        EnquiryRequest.Type busBooking = EnquiryRequest.Type.fromString("bus_booking");
        System.out.println("'bus_booking' maps to: " + busBooking + " -> title: " + formatter.getDisplayTypeTitle(busBooking));
        
        EnquiryRequest.Type busTicket = EnquiryRequest.Type.fromString("bus_ticket");
        System.out.println("'bus_ticket' maps to: " + busTicket + " -> title: " + formatter.getDisplayTypeTitle(busTicket));
    }
}