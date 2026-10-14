package com.comforttravels.service;

import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientResponseException;

import java.time.Duration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class EmailService {

    private final JavaMailSender mailSender;
    private final RestClient restClient;

    @Value("${app.mail.provider:auto}")
    private String configuredProvider;

    @Value("${app.mail.enquiry-recipient:comforttravels52@gmail.com}")
    private String enquiryRecipient;

    @Value("${app.mail.from:comforttravels52@gmail.com}")
    private String defaultFrom;

    @Value("${app.mail.from-name:Comfort Travels Portal}")
    private String defaultFromName;

    @Value("${app.mail.enabled:true}")
    private boolean mailEnabled;

    @Value("${app.mail.brevo.api-key:}")
    private String brevoApiKey;

    @Value("${app.mail.resend.api-key:}")
    private String resendApiKey;

    @Autowired
    public EmailService(@Autowired(required = false) JavaMailSender mailSender) {
        this.mailSender = mailSender;
        SimpleClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory();
        requestFactory.setConnectTimeout(Duration.ofSeconds(10));
        requestFactory.setReadTimeout(Duration.ofSeconds(10));
        this.restClient = RestClient.builder().requestFactory(requestFactory).build();
    }

    @Async
    public void sendEnquiryNotification(String subject, String replyToEmail, String htmlBody, String textBody) {
        if (!mailEnabled) {
            log.info("Email sending is disabled via configuration. Skipping mail for subject: {}", subject);
            log.debug("Plain text message body preview:\n{}", textBody);
            return;
        }

        String provider = resolveProvider();
        log.info("Dispatching enquiry email via [{}] to: '{}' with subject: '{}' and reply-to: '{}'",
                provider, enquiryRecipient, subject, replyToEmail);

        try {
            switch (provider.toLowerCase()) {
                case "brevo" -> sendViaBrevo(subject, replyToEmail, htmlBody, textBody);
                case "resend" -> sendViaResend(subject, replyToEmail, htmlBody, textBody);
                case "smtp" -> sendViaSmtp(subject, replyToEmail, htmlBody, textBody);
                default -> {
                    log.warn("No valid email provider configured (resolved provider='{}'). Email was not dispatched.", provider);
                    log.info("Enquiry content fallback log:\nSubject: {}\nBody:\n{}", subject, textBody);
                }
            }
        } catch (RestClientResponseException e) {
            log.error("HTTP error sending enquiry email via {} to {}. Status: {}, Response: {}",
                    provider, enquiryRecipient, e.getStatusCode(), e.getResponseBodyAsString(), e);
            log.info("Enquiry content that failed to send via HTTP API:\nSubject: {}\nBody:\n{}", subject, textBody);
        } catch (Exception e) {
            log.error("Failed to send enquiry email via {} to {}. Error: {}",
                    provider, enquiryRecipient, e.getMessage(), e);
            log.info("Enquiry content that failed to send:\nSubject: {}\nBody:\n{}", subject, textBody);
        }
    }

    private String resolveProvider() {
        if (configuredProvider != null && !configuredProvider.equalsIgnoreCase("auto")) {
            return configuredProvider.toLowerCase();
        }
        if (brevoApiKey != null && !brevoApiKey.isBlank()) {
            return "brevo";
        }
        if (resendApiKey != null && !resendApiKey.isBlank()) {
            return "resend";
        }
        if (mailSender != null) {
            return "smtp";
        }
        return "none";
    }

    private void sendViaBrevo(String subject, String replyToEmail, String htmlBody, String textBody) {
        if (brevoApiKey == null || brevoApiKey.isBlank()) {
            throw new IllegalStateException("Brevo API key is not configured (BREVO_API_KEY / app.mail.brevo.api-key)");
        }

        Map<String, Object> payload = new HashMap<>();
        payload.put("sender", Map.of("name", defaultFromName, "email", defaultFrom));
        payload.put("to", List.of(Map.of("email", enquiryRecipient)));

        if (replyToEmail != null && !replyToEmail.trim().isEmpty() && replyToEmail.contains("@")) {
            payload.put("replyTo", Map.of("email", replyToEmail.trim()));
        }

        payload.put("subject", subject);

        if (htmlBody != null && !htmlBody.isBlank()) {
            payload.put("htmlContent", htmlBody);
        }
        if (textBody != null && !textBody.isBlank()) {
            payload.put("textContent", textBody);
        }

        ResponseEntity<String> response = restClient.post()
                .uri("https://api.brevo.com/v3/smtp/email")
                .header("api-key", brevoApiKey.trim())
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .body(payload)
                .retrieve()
                .toEntity(String.class);

        log.info("Enquiry email successfully dispatched via Brevo HTTP API to {}. Response status: {}",
                enquiryRecipient, response.getStatusCode());
    }

    private void sendViaResend(String subject, String replyToEmail, String htmlBody, String textBody) {
        if (resendApiKey == null || resendApiKey.isBlank()) {
            throw new IllegalStateException("Resend API key is not configured (RESEND_API_KEY / app.mail.resend.api-key)");
        }

        Map<String, Object> payload = new HashMap<>();
        payload.put("from", String.format("%s <%s>", defaultFromName, defaultFrom));
        payload.put("to", List.of(enquiryRecipient));

        if (replyToEmail != null && !replyToEmail.trim().isEmpty() && replyToEmail.contains("@")) {
            payload.put("reply_to", replyToEmail.trim());
        }

        payload.put("subject", subject);

        if (htmlBody != null && !htmlBody.isBlank()) {
            payload.put("html", htmlBody);
        }
        if (textBody != null && !textBody.isBlank()) {
            payload.put("text", textBody);
        }

        ResponseEntity<String> response = restClient.post()
                .uri("https://api.resend.com/emails")
                .header("Authorization", "Bearer " + resendApiKey.trim())
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .body(payload)
                .retrieve()
                .toEntity(String.class);

        log.info("Enquiry email successfully dispatched via Resend HTTP API to {}. Response status: {}",
                enquiryRecipient, response.getStatusCode());
    }

    private void sendViaSmtp(String subject, String replyToEmail, String htmlBody, String textBody) throws Exception {
        if (mailSender == null) {
            throw new IllegalStateException("JavaMailSender is not configured.");
        }

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

        helper.setTo(enquiryRecipient);
        helper.setFrom(defaultFrom, defaultFromName);
        helper.setSubject(subject);

        if (replyToEmail != null && !replyToEmail.trim().isEmpty() && replyToEmail.contains("@")) {
            helper.setReplyTo(replyToEmail.trim());
        }

        if (htmlBody != null && !htmlBody.trim().isEmpty()) {
            helper.setText(textBody, htmlBody);
        } else {
            helper.setText(textBody, false);
        }

        mailSender.send(mimeMessage);
        log.info("Enquiry email successfully dispatched via SMTP to {}", enquiryRecipient);
    }
}
