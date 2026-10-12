package com.comforttravels.service;

import com.comforttravels.dto.EnquiryRequest;
import com.comforttravels.repository.TravelPackageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class EnquiryService {
    private final EmailService emailService;
    private final EnquiryEmailFormatter emailFormatter;
    private final TravelPackageRepository packageRepository;

    public void create(EnquiryRequest req) {
        enrichPackageDetails(req);
        String primaryName = resolveName(req);
        String primaryEmail = resolveEmail(req);

        String emailSubject = emailFormatter.generateSubject(req);
        String textMessage = emailFormatter.formatPlainTextMessage(req);
        String htmlMessage = emailFormatter.formatHtmlMessage(req);

        // Dispatch email notification only (no DB persistence)
        emailService.sendEnquiryNotification(emailSubject, primaryEmail, htmlMessage, textMessage);

        log.info("Enquiry email sent for customer='{}'", primaryName);
    }

    private void enrichPackageDetails(EnquiryRequest req) {
        if (req.getType() == EnquiryRequest.Type.PACKAGE || (req.getPackageId() != null && !req.getPackageId().isBlank())) {
            if ((req.getPackageName() == null || req.getPackageName().isBlank()) && req.getPackageId() != null && !req.getPackageId().isBlank()) {
                String pkgIdStr = req.getPackageId().trim();
                try {
                    Long id = Long.parseLong(pkgIdStr);
                    packageRepository.findById(id).ifPresent(pkg -> req.setPackageName(pkg.getTitle()));
                } catch (NumberFormatException e) {
                    packageRepository.findBySlug(pkgIdStr).ifPresent(pkg -> req.setPackageName(pkg.getTitle()));
                }
            }
        }
    }

    private String resolveName(EnquiryRequest req) {
        if (req.getName() != null && !req.getName().trim().isEmpty()) {
            return req.getName().trim();
        }
        if (req.getPassengers() != null && !req.getPassengers().isEmpty()) {
            String pName = req.getPassengers().get(0).getName();
            if (pName != null && !pName.trim().isEmpty()) {
                return pName.trim();
            }
        }
        return "Customer";
    }

    private String resolveEmail(EnquiryRequest req) {
        if (req.getEmail() != null && !req.getEmail().trim().isEmpty()) {
            return req.getEmail().trim();
        }
        if (req.getPassengers() != null && !req.getPassengers().isEmpty()) {
            String pEmail = req.getPassengers().get(0).getEmail();
            if (pEmail != null && !pEmail.trim().isEmpty()) {
                return pEmail.trim();
            }
        }
        return "no-reply@comforttravels.com";
    }
}