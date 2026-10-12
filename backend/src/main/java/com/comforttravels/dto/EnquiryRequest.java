package com.comforttravels.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class EnquiryRequest {
    // Basic contact details
    private String name;

    @Email
    private String email;

    private String phone;

    private Type type;

    // Contact-specific
    private String subject;

    // Common / Remarks
    private String message;

    // Package-specific / General
    private String packageId;
    private String packageName;
    private int travellers;
    private String travelDate;
    private String budget;

    // Flight & Train common
    @JsonAlias({"fromLocation"})
    @JsonProperty("from")
    private String from;

    @JsonAlias({"toLocation"})
    @JsonProperty("to")
    private String to;

    // Flight-specific
    private String tripType; // "round-trip" | "one-way"
    private String departDate;
    private String returnDate;

    @JsonAlias({"flightClass", "trainClass"})
    @JsonProperty("class")
    private String travelClass;

    private Boolean freeCancellation;

    // Train-specific
    private String quota;
    private String preferredTrain;

    // Hotel-specific
    private String city;

    @JsonAlias({"checkInDate"})
    private String checkIn;

    @JsonAlias({"checkOutDate"})
    private String checkOut;

    private Integer rooms;

    // Visa-specific
    private String countryOfResidence;
    private String nationality;
    private String destinationCountry;
    private String visaType;

    // Passengers list (Flights, Trains, Hotels)
    private List<PassengerDto> passengers;

    // Optional flexible metadata
    private Map<String, Object> details;

    public enum Type {
        GENERAL, CONTACT, PACKAGE, VISA, FLIGHT, TRAIN, HOTEL, BUS;

        @JsonCreator
        public static Type fromString(String value) {
            if (value == null || value.trim().isEmpty()) {
                return GENERAL;
            }
            String clean = value.trim().toUpperCase().replace("-", "_").replace(" ", "_");
            if (clean.equals("FLIGHTS") || clean.equals("FLIGHT_BOOKING") || clean.equals("FLIGHT_ENQUIRY") || clean.equals("FLIGHT_TICKET")) return FLIGHT;
            if (clean.equals("TRAINS") || clean.equals("TRAIN_BOOKING") || clean.equals("TRAIN_ENQUIRY") || clean.equals("TRAIN_TICKET")) return TRAIN;
            if (clean.equals("HOTELS") || clean.equals("HOTEL_BOOKING") || clean.equals("HOTEL_ENQUIRY") || clean.equals("HOTEL_RESERVATION")) return HOTEL;
            if (clean.equals("BUSES") || clean.equals("BUS") || clean.equals("BUS_TRAVEL") || clean.equals("BUS_BOOKING") || clean.equals("BUS_ENQUIRY") || clean.equals("BUS_TICKET")) return BUS;
            if (clean.equals("PACKAGES") || clean.equals("PACKAGE_ENQUIRY")) return PACKAGE;
            if (clean.equals("CONTACT_US") || clean.equals("CONTACT_ENQUIRY")) return CONTACT;
            if (clean.equals("VISA") || clean.equals("VISA_SERVICES") || clean.equals("VISA_ENQUIRY")) return VISA;
            try {
                return Type.valueOf(clean);
            } catch (IllegalArgumentException e) {
                return GENERAL;
            }
        }
    }
}