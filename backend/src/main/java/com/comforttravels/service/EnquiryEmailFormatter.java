package com.comforttravels.service;

import com.comforttravels.dto.EnquiryRequest;
import com.comforttravels.dto.PassengerDto;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Component
public class EnquiryEmailFormatter {

    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm a");

    public String generateSubject(EnquiryRequest req) {
        String name = (req.getName() != null && !req.getName().trim().isEmpty())
                ? req.getName().trim()
                : resolveFirstPassengerName(req);
        if (name == null || name.isEmpty()) {
            name = "Customer";
        }
        if (req.getType() == EnquiryRequest.Type.PACKAGE && req.getPackageName() != null && !req.getPackageName().isBlank()) {
            return "Enquiry | " + name + " - " + req.getPackageName().trim();
        }
        return "Enquiry | " + name;
    }

    public String getDisplayTypeTitle(EnquiryRequest.Type type) {
        if (type == null) return "General Travel Enquiry";
        return switch (type) {
            case CONTACT -> "Contact Us Enquiry";
            case PACKAGE -> "Holiday Package Enquiry";
            case FLIGHT -> "Flight Booking Enquiry";
            case TRAIN -> "Train Booking Enquiry";
            case HOTEL -> "Hotel Reservation Enquiry";
            case BUS -> "Bus Travel Enquiry";
            case VISA -> "Visa Services Enquiry";
            default -> "General Travel Enquiry";
        };
    }

    public String formatPlainTextMessage(EnquiryRequest req) {
        StringBuilder sb = new StringBuilder();
        String title = getDisplayTypeTitle(req.getType());
        sb.append("====================================================\n");
        sb.append("          COMFORT TRAVELS - ").append(title.toUpperCase()).append("\n");
        sb.append("====================================================\n\n");

        sb.append("Date Received: ").append(LocalDateTime.now().format(DATE_TIME_FORMATTER)).append("\n\n");

        sb.append("--- CUSTOMER INFORMATION ---\n");
        sb.append("Name: ").append(safe(req.getName(), resolveFirstPassengerName(req))).append("\n");
        sb.append("Email: ").append(safe(req.getEmail(), resolveFirstPassengerEmail(req))).append("\n");
        sb.append("Phone: ").append(safe(req.getPhone(), resolveFirstPassengerPhone(req))).append("\n\n");

        sb.append("--- ENQUIRY DETAILS ---\n");
        sb.append("Enquiry Type: ").append(title).append("\n");

        EnquiryRequest.Type type = req.getType() != null ? req.getType() : EnquiryRequest.Type.GENERAL;

        switch (type) {
            case CONTACT -> {
                sb.append("Subject: ").append(safe(req.getSubject())).append("\n");
                sb.append("Message: ").append(safe(req.getMessage())).append("\n");
            }
            case PACKAGE -> {
                if (req.getPackageName() != null && !req.getPackageName().isBlank()) {
                    sb.append("Package: ").append(req.getPackageName().trim()).append("\n");
                    if (req.getPackageId() != null && !req.getPackageId().isBlank()) {
                        sb.append("Package ID: ").append(req.getPackageId().trim()).append("\n");
                    }
                } else if (req.getPackageId() != null && !req.getPackageId().isBlank()) {
                    sb.append("Package: ").append(req.getPackageId().trim()).append("\n");
                }
                sb.append("Travellers: ").append(req.getTravellers() > 0 ? req.getTravellers() : "Not specified").append("\n");
                sb.append("Travel Date: ").append(safe(req.getTravelDate())).append("\n");
                if (req.getBudget() != null && !req.getBudget().isBlank()) {
                    sb.append("Budget: ").append(req.getBudget()).append("\n");
                }
                if (req.getMessage() != null && !req.getMessage().isBlank()) {
                    sb.append("Special Requests / Notes: ").append(req.getMessage()).append("\n");
                }
            }
            case FLIGHT -> {
                sb.append("Trip Type: ").append(safe(req.getTripType())).append("\n");
                sb.append("Route: ").append(safe(req.getFrom())).append(" -> ").append(safe(req.getTo())).append("\n");
                sb.append("Departure Date: ").append(safe(req.getDepartDate())).append("\n");
                if ("round-trip".equalsIgnoreCase(req.getTripType()) || req.getReturnDate() != null) {
                    sb.append("Return Date: ").append(safe(req.getReturnDate())).append("\n");
                }
                sb.append("Cabin Class: ").append(safe(req.getTravelClass())).append("\n");
                sb.append("Free Cancellation Requested: ").append(Boolean.TRUE.equals(req.getFreeCancellation()) ? "Yes" : "No").append("\n");
                appendPassengersText(sb, req.getPassengers());
                if (req.getMessage() != null && !req.getMessage().isBlank()) {
                    sb.append("\nAdditional Notes: ").append(req.getMessage()).append("\n");
                }
            }
            case TRAIN -> {
                sb.append("Route: ").append(safe(req.getFrom())).append(" -> ").append(safe(req.getTo())).append("\n");
                sb.append("Travel Date: ").append(safe(req.getTravelDate())).append("\n");
                sb.append("Train Class: ").append(safe(req.getTravelClass())).append("\n");
                sb.append("Quota: ").append(safe(req.getQuota())).append("\n");
                if (req.getPreferredTrain() != null && !req.getPreferredTrain().isBlank()) {
                    sb.append("Preferred Train: ").append(req.getPreferredTrain()).append("\n");
                }
                appendPassengersText(sb, req.getPassengers());
                if (req.getMessage() != null && !req.getMessage().isBlank()) {
                    sb.append("\nAdditional Notes: ").append(req.getMessage()).append("\n");
                }
            }
            case BUS -> {
                sb.append("Route: ").append(safe(req.getFrom())).append(" -> ").append(safe(req.getTo())).append("\n");
                sb.append("Travel Date: ").append(safe(req.getTravelDate())).append("\n");
                sb.append("Bus Type: ").append(safe(req.getTravelClass())).append("\n");
                if (req.getPreferredTrain() != null && !req.getPreferredTrain().isBlank()) {
                    sb.append("Preferred Bus: ").append(req.getPreferredTrain()).append("\n");
                }
                appendPassengersText(sb, req.getPassengers());
                if (req.getMessage() != null && !req.getMessage().isBlank()) {
                    sb.append("\nAdditional Notes: ").append(req.getMessage()).append("\n");
                }
            }
            case HOTEL -> {
                sb.append("City / Location: ").append(safe(req.getCity())).append("\n");
                sb.append("Check-in Date: ").append(safe(req.getCheckIn())).append("\n");
                sb.append("Check-out Date: ").append(safe(req.getCheckOut())).append("\n");
                sb.append("Rooms: ").append(req.getRooms() != null ? req.getRooms() : 1).append("\n");
                appendPassengersText(sb, req.getPassengers());
                if (req.getMessage() != null && !req.getMessage().isBlank()) {
                    sb.append("\nSpecial Requests: ").append(req.getMessage()).append("\n");
                }
            }
            case VISA -> {
                sb.append("Destination Country: ").append(safe(req.getDestinationCountry())).append("\n");
                sb.append("Visa Type: ").append(safe(req.getVisaType())).append("\n");
                sb.append("Country of Residence: ").append(safe(req.getCountryOfResidence())).append("\n");
                sb.append("Nationality: ").append(safe(req.getNationality())).append("\n");
                if (req.getMessage() != null && !req.getMessage().isBlank()) {
                    sb.append("Notes: ").append(req.getMessage()).append("\n");
                }
            }
            default -> {
                if (req.getTravellers() > 0) sb.append("Travellers: ").append(req.getTravellers()).append("\n");
                if (req.getTravelDate() != null) sb.append("Travel Date: ").append(req.getTravelDate()).append("\n");
                if (req.getBudget() != null) sb.append("Budget: ").append(req.getBudget()).append("\n");
                sb.append("Message: ").append(safe(req.getMessage())).append("\n");
            }
        }

        return sb.toString();
    }

    public String formatHtmlMessage(EnquiryRequest req) {
        String title = getDisplayTypeTitle(req.getType());
        String name = safe(req.getName(), resolveFirstPassengerName(req));
        String email = safe(req.getEmail(), resolveFirstPassengerEmail(req));
        String phone = safe(req.getPhone(), resolveFirstPassengerPhone(req));
        String receivedAt = LocalDateTime.now().format(DATE_TIME_FORMATTER);

        StringBuilder sb = new StringBuilder();
        sb.append("<!DOCTYPE html><html><head><meta charset=\"UTF-8\">");
        sb.append("<style>");
        sb.append("body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f4f6f9; color: #2d3748; }");
        sb.append(".container { max-width: 650px; margin: 30px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 14px rgba(0,0,0,0.08); }");
        sb.append(".header { background: linear-gradient(135deg, #0f2942 0%, #1e3a8a 100%); color: #ffffff; padding: 28px 24px; text-align: center; }");
        sb.append(".header h1 { margin: 0 0 6px 0; font-size: 24px; font-weight: 700; letter-spacing: 0.5px; }");
        sb.append(".header p { margin: 0; font-size: 13px; opacity: 0.85; }");
        sb.append(".badge { display: inline-block; background-color: #f59e0b; color: #ffffff; font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: 9999px; margin-top: 10px; text-transform: uppercase; }");
        sb.append(".content { padding: 24px 28px; }");
        sb.append(".section { margin-bottom: 24px; }");
        sb.append(".section-title { font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #64748b; margin-bottom: 12px; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; }");
        sb.append(".grid { width: 100%; border-collapse: collapse; }");
        sb.append(".grid td { padding: 8px 10px; font-size: 14px; vertical-align: top; }");
        sb.append(".label { width: 35%; color: #475569; font-weight: 600; }");
        sb.append(".value { width: 65%; color: #0f172a; font-weight: 400; }");
        sb.append(".table-custom { width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 13px; }");
        sb.append(".table-custom th { background: #f1f5f9; text-align: left; padding: 8px 10px; color: #475569; border-bottom: 2px solid #cbd5e1; }");
        sb.append(".table-custom td { padding: 8px 10px; border-bottom: 1px solid #e2e8f0; }");
        sb.append(".message-box { background: #f8fafc; border-left: 4px solid #3b82f6; padding: 12px 16px; border-radius: 4px; font-size: 14px; line-height: 1.5; color: #1e293b; }");
        sb.append(".footer { background: #f8fafc; text-align: center; padding: 18px 20px; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }");
        sb.append("</style></head><body>");

        sb.append("<div class=\"container\">");
        sb.append("<div class=\"header\">");
        sb.append("<h1>Comfort Travels</h1>");
        sb.append("<p>New Customer Inquiry Notification</p>");
        sb.append("<span class=\"badge\">").append(escapeHtml(title)).append("</span>");
        sb.append("</div>");

        sb.append("<div class=\"content\">");

        // Customer details section
        sb.append("<div class=\"section\">");
        sb.append("<div class=\"section-title\">Customer Information</div>");
        sb.append("<table class=\"grid\">");
        sb.append("<tr><td class=\"label\">Full Name:</td><td class=\"value\"><strong>").append(escapeHtml(name)).append("</strong></td></tr>");
        sb.append("<tr><td class=\"label\">Email Address:</td><td class=\"value\"><a href=\"mailto:").append(escapeHtml(email)).append("\" style=\"color:#2563eb;text-decoration:none;\">").append(escapeHtml(email)).append("</a></td></tr>");
        sb.append("<tr><td class=\"label\">Phone Number:</td><td class=\"value\"><a href=\"tel:").append(escapeHtml(phone)).append("\" style=\"color:#2563eb;text-decoration:none;\">").append(escapeHtml(phone)).append("</a></td></tr>");
        sb.append("<tr><td class=\"label\">Received On:</td><td class=\"value\">").append(escapeHtml(receivedAt)).append("</td></tr>");
        sb.append("</table>");
        sb.append("</div>");

        // Case-specific details section
        sb.append("<div class=\"section\">");
        sb.append("<div class=\"section-title\">").append(escapeHtml(title)).append(" Details</div>");
        sb.append("<table class=\"grid\">");

        EnquiryRequest.Type type = req.getType() != null ? req.getType() : EnquiryRequest.Type.GENERAL;

        switch (type) {
            case CONTACT -> {
                sb.append("<tr><td class=\"label\">Subject:</td><td class=\"value\"><strong>").append(escapeHtml(safe(req.getSubject()))).append("</strong></td></tr>");
            }
            case PACKAGE -> {
                if (req.getPackageName() != null && !req.getPackageName().isBlank()) {
                    sb.append("<tr><td class=\"label\">Package Name:</td><td class=\"value\"><strong>").append(escapeHtml(req.getPackageName().trim())).append("</strong></td></tr>");
                    if (req.getPackageId() != null && !req.getPackageId().isBlank()) {
                        sb.append("<tr><td class=\"label\">Package ID:</td><td class=\"value\">").append(escapeHtml(req.getPackageId().trim())).append("</td></tr>");
                    }
                } else if (req.getPackageId() != null && !req.getPackageId().isBlank()) {
                    sb.append("<tr><td class=\"label\">Package Name / ID:</td><td class=\"value\"><strong>").append(escapeHtml(req.getPackageId().trim())).append("</strong></td></tr>");
                }
                sb.append("<tr><td class=\"label\">Travellers:</td><td class=\"value\">").append(req.getTravellers() > 0 ? req.getTravellers() : "Not specified").append("</td></tr>");
                sb.append("<tr><td class=\"label\">Preferred Travel Date:</td><td class=\"value\">").append(escapeHtml(safe(req.getTravelDate()))).append("</td></tr>");
                if (req.getBudget() != null && !req.getBudget().isBlank()) {
                    sb.append("<tr><td class=\"label\">Budget:</td><td class=\"value\">").append(escapeHtml(req.getBudget())).append("</td></tr>");
                }
            }
            case FLIGHT -> {
                sb.append("<tr><td class=\"label\">Trip Type:</td><td class=\"value\"><span style=\"text-transform:capitalize;\">").append(escapeHtml(safe(req.getTripType()))).append("</span></td></tr>");
                sb.append("<tr><td class=\"label\">Flight Route:</td><td class=\"value\"><strong>").append(escapeHtml(safe(req.getFrom()))).append(" &rarr; ").append(escapeHtml(safe(req.getTo()))).append("</strong></td></tr>");
                sb.append("<tr><td class=\"label\">Departure Date:</td><td class=\"value\">").append(escapeHtml(safe(req.getDepartDate()))).append("</td></tr>");
                if ("round-trip".equalsIgnoreCase(req.getTripType()) || req.getReturnDate() != null) {
                    sb.append("<tr><td class=\"label\">Return Date:</td><td class=\"value\">").append(escapeHtml(safe(req.getReturnDate()))).append("</td></tr>");
                }
                sb.append("<tr><td class=\"label\">Cabin Class:</td><td class=\"value\"><span style=\"text-transform:capitalize;\">").append(escapeHtml(safe(req.getTravelClass()))).append("</span></td></tr>");
                sb.append("<tr><td class=\"label\">Free Cancellation:</td><td class=\"value\">").append(Boolean.TRUE.equals(req.getFreeCancellation()) ? "<span style=\"color:#16a34a;font-weight:600;\">Yes</span>" : "No").append("</td></tr>");
                int travCount = req.getPassengers() != null ? req.getPassengers().size() : (req.getTravellers() > 0 ? req.getTravellers() : 1);
                sb.append("<tr><td class=\"label\">Passengers Count:</td><td class=\"value\">").append(travCount).append("</td></tr>");
            }
            case TRAIN -> {
                sb.append("<tr><td class=\"label\">Train Route:</td><td class=\"value\"><strong>").append(escapeHtml(safe(req.getFrom()))).append(" &rarr; ").append(escapeHtml(safe(req.getTo()))).append("</strong></td></tr>");
                sb.append("<tr><td class=\"label\">Travel Date:</td><td class=\"value\">").append(escapeHtml(safe(req.getTravelDate()))).append("</td></tr>");
                sb.append("<tr><td class=\"label\">Class:</td><td class=\"value\">").append(escapeHtml(safe(req.getTravelClass()))).append("</td></tr>");
                sb.append("<tr><td class=\"label\">Quota:</td><td class=\"value\">").append(escapeHtml(safe(req.getQuota()))).append("</td></tr>");
                if (req.getPreferredTrain() != null && !req.getPreferredTrain().isBlank()) {
                    sb.append("<tr><td class=\"label\">Preferred Train:</td><td class=\"value\">").append(escapeHtml(req.getPreferredTrain())).append("</td></tr>");
                }
                int travCount = req.getPassengers() != null ? req.getPassengers().size() : (req.getTravellers() > 0 ? req.getTravellers() : 1);
                sb.append("<tr><td class=\"label\">Passengers Count:</td><td class=\"value\">").append(travCount).append("</td></tr>");
            }
            case BUS -> {
                sb.append("<tr><td class=\"label\">Bus Route:</td><td class=\"value\"><strong>").append(escapeHtml(safe(req.getFrom()))).append(" &rarr; ").append(escapeHtml(safe(req.getTo()))).append("</strong></td></tr>");
                sb.append("<tr><td class=\"label\">Travel Date:</td><td class=\"value\">").append(escapeHtml(safe(req.getTravelDate()))).append("</td></tr>");
                sb.append("<tr><td class=\"label\">Bus Type:</td><td class=\"value\">").append(escapeHtml(safe(req.getTravelClass()))).append("</td></tr>");
                if (req.getPreferredTrain() != null && !req.getPreferredTrain().isBlank()) {
                    sb.append("<tr><td class=\"label\">Preferred Bus:</td><td class=\"value\">").append(escapeHtml(req.getPreferredTrain())).append("</td></tr>");
                }
                int travCount = req.getPassengers() != null ? req.getPassengers().size() : (req.getTravellers() > 0 ? req.getTravellers() : 1);
                sb.append("<tr><td class=\"label\">Passengers Count:</td><td class=\"value\">").append(travCount).append("</td></tr>");
            }
            case HOTEL -> {
                sb.append("<tr><td class=\"label\">City / Location:</td><td class=\"value\"><strong>").append(escapeHtml(safe(req.getCity()))).append("</strong></td></tr>");
                sb.append("<tr><td class=\"label\">Check-in Date:</td><td class=\"value\">").append(escapeHtml(safe(req.getCheckIn()))).append("</td></tr>");
                sb.append("<tr><td class=\"label\">Check-out Date:</td><td class=\"value\">").append(escapeHtml(safe(req.getCheckOut()))).append("</td></tr>");
                sb.append("<tr><td class=\"label\">Rooms:</td><td class=\"value\">").append(req.getRooms() != null ? req.getRooms() : 1).append("</td></tr>");
                int guestCount = req.getPassengers() != null ? req.getPassengers().size() : (req.getTravellers() > 0 ? req.getTravellers() : 1);
                sb.append("<tr><td class=\"label\">Total Guests:</td><td class=\"value\">").append(guestCount).append("</td></tr>");
            }
            case VISA -> {
                sb.append("<tr><td class=\"label\">Destination Country:</td><td class=\"value\"><strong>").append(escapeHtml(safe(req.getDestinationCountry()))).append("</strong></td></tr>");
                sb.append("<tr><td class=\"label\">Visa Type:</td><td class=\"value\">").append(escapeHtml(safe(req.getVisaType()))).append("</td></tr>");
                sb.append("<tr><td class=\"label\">Country of Residence:</td><td class=\"value\">").append(escapeHtml(safe(req.getCountryOfResidence()))).append("</td></tr>");
                sb.append("<tr><td class=\"label\">Nationality:</td><td class=\"value\">").append(escapeHtml(safe(req.getNationality()))).append("</td></tr>");
            }
            default -> {
                if (req.getTravellers() > 0) sb.append("<tr><td class=\"label\">Travellers:</td><td class=\"value\">").append(req.getTravellers()).append("</td></tr>");
                if (req.getTravelDate() != null) sb.append("<tr><td class=\"label\">Travel Date:</td><td class=\"value\">").append(escapeHtml(req.getTravelDate())).append("</td></tr>");
                if (req.getBudget() != null) sb.append("<tr><td class=\"label\">Budget:</td><td class=\"value\">").append(escapeHtml(req.getBudget())).append("</td></tr>");
            }
        }
        sb.append("</table>");
        sb.append("</div>");

        // Passenger list table for Flight, Train, Hotel, Bus
        if (req.getPassengers() != null && !req.getPassengers().isEmpty()) {
            sb.append("<div class=\"section\">");
            String listHeading = (type == EnquiryRequest.Type.HOTEL) ? "Guests / Room Occupants" : "Passenger Details";
            sb.append("<div class=\"section-title\">").append(listHeading).append(" (").append(req.getPassengers().size()).append(")</div>");
            sb.append("<table class=\"table-custom\">");
            sb.append("<thead><tr>");
            sb.append("<th>#</th><th>Name</th><th>Age/Sex</th>");
            if (type == EnquiryRequest.Type.TRAIN || type == EnquiryRequest.Type.BUS) {
                sb.append("<th>Seat/Berth Preference</th>");
            }
            sb.append("<th>Email</th><th>Phone</th>");
            sb.append("</tr></thead><tbody>");

            int idx = 1;
            for (PassengerDto p : req.getPassengers()) {
                sb.append("<tr>");
                sb.append("<td>").append(idx++).append("</td>");
                sb.append("<td><strong>").append(escapeHtml(safe(p.getName()))).append("</strong></td>");
                String ageSex = safe(p.getAge() != null ? p.getAge().toString() : "-", "-") + " / " + safe(p.getSex(), "-");
                sb.append("<td>").append(escapeHtml(ageSex)).append("</td>");
                if (type == EnquiryRequest.Type.TRAIN || type == EnquiryRequest.Type.BUS) {
                    sb.append("<td>").append(escapeHtml(safe(p.getBerthPreference(), "None"))).append("</td>");
                }
                sb.append("<td>").append(escapeHtml(safe(p.getEmail(), "-"))).append("</td>");
                sb.append("<td>").append(escapeHtml(safe(p.getPhone(), "-"))).append("</td>");
                sb.append("</tr>");
            }
            sb.append("</tbody></table>");
            sb.append("</div>");
        }

        // Message / Additional Notes block
        if (req.getMessage() != null && !req.getMessage().trim().isEmpty()) {
            sb.append("<div class=\"section\">");
            sb.append("<div class=\"section-title\">Message / Requirements</div>");
            sb.append("<div class=\"message-box\">").append(escapeHtml(req.getMessage()).replace("\n", "<br/>")).append("</div>");
            sb.append("</div>");
        }

        sb.append("</div>"); // content

        sb.append("<div class=\"footer\">");
        sb.append("This is an automated notification from Comfort Travels website portal.<br/>");
        sb.append("&copy; ").append(LocalDateTime.now().getYear()).append(" Comfort Travels. All rights reserved.");
        sb.append("</div>");

        sb.append("</div></body></html>");

        return sb.toString();
    }

    private void appendPassengersText(StringBuilder sb, List<PassengerDto> passengers) {
        if (passengers == null || passengers.isEmpty()) return;
        sb.append("\n--- PASSENGER / GUEST LIST (").append(passengers.size()).append(") ---\n");
        int i = 1;
        for (PassengerDto p : passengers) {
            sb.append(i++).append(". ")
                    .append(safe(p.getName())).append(" | Age: ").append(p.getAge() != null ? p.getAge() : "N/A")
                    .append(" | Sex: ").append(safe(p.getSex(), "N/A"));
            if (p.getBerthPreference() != null && !p.getBerthPreference().isBlank()) {
                sb.append(" | Seat/Berth: ").append(p.getBerthPreference());
            }
            if (p.getEmail() != null && !p.getEmail().isBlank()) {
                sb.append(" | Email: ").append(p.getEmail());
            }
            if (p.getPhone() != null && !p.getPhone().isBlank()) {
                sb.append(" | Phone: ").append(p.getPhone());
            }
            sb.append("\n");
        }
    }

    private String resolveFirstPassengerName(EnquiryRequest req) {
        if (req.getPassengers() != null && !req.getPassengers().isEmpty()) {
            return req.getPassengers().get(0).getName();
        }
        return null;
    }

    private String resolveFirstPassengerEmail(EnquiryRequest req) {
        if (req.getPassengers() != null && !req.getPassengers().isEmpty()) {
            return req.getPassengers().get(0).getEmail();
        }
        return null;
    }

    private String resolveFirstPassengerPhone(EnquiryRequest req) {
        if (req.getPassengers() != null && !req.getPassengers().isEmpty()) {
            return req.getPassengers().get(0).getPhone();
        }
        return null;
    }

    private String safe(String val) {
        return (val != null && !val.trim().isEmpty()) ? val.trim() : "Not specified";
    }

    private String safe(String primary, String fallback) {
        if (primary != null && !primary.trim().isEmpty()) return primary.trim();
        if (fallback != null && !fallback.trim().isEmpty()) return fallback.trim();
        return "Not specified";
    }

    private String escapeHtml(String input) {
        if (input == null) return "";
        return input.replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace("\"", "&quot;")
                .replace("'", "&#39;");
    }
}
