package com.comforttravels.service;

import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.mail.enquiry-recipient:comforttravels52@gmail.com}")
    private String enquiryRecipient;

    @Value("${app.mail.from:comforttravels52@gmail.com}")
    private String defaultFrom;

    @Value("${app.mail.enabled:true}")
    private boolean mailEnabled;

    @Autowired
    public EmailService(@Autowired(required = false) JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendEnquiryNotification(String subject, String replyToEmail, String htmlBody, String textBody) {
        if (!mailEnabled) {
            log.info("Email sending is disabled via configuration. Skipping mail for subject: {}", subject);
            log.debug("Plain text message body preview:\n{}", textBody);
            return;
        }

        if (mailSender == null) {
            log.warn("JavaMailSender is not configured. Email could not be sent to: {}", enquiryRecipient);
            log.info("Subject: {}\nEmail text:\n{}", subject, textBody);
            return;
        }

        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setTo(enquiryRecipient);
            helper.setFrom(defaultFrom, "Comfort Travels Portal");
            helper.setSubject(subject);

            if (replyToEmail != null && !replyToEmail.trim().isEmpty() && replyToEmail.contains("@")) {
                helper.setReplyTo(replyToEmail.trim());
            }

            if (htmlBody != null && !htmlBody.trim().isEmpty()) {
                helper.setText(textBody, htmlBody);
            } else {
                helper.setText(textBody, false);
            }

            log.info("Sending enquiry email to: '{}' with subject: '{}' and reply-to: '{}'",
                    enquiryRecipient, subject, replyToEmail);
            mailSender.send(mimeMessage);
            log.info("Enquiry email successfully dispatched to {}", enquiryRecipient);

        } catch (Exception e) {
            log.error("Failed to send enquiry email to {}. Error: {}", enquiryRecipient, e.getMessage(), e);
            // Log plain text body so enquiry info is not lost in development or when SMTP is unavailable
            log.info("Enquiry content that failed to send via SMTP:\nSubject: {}\nBody:\n{}", subject, textBody);
        }
    }
}
