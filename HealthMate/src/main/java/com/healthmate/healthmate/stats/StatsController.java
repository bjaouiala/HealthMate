package com.healthmate.healthmate.stats;

import com.healthmate.healthmate.email.EmailService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/health-indices")
public class StatsController {

    @Autowired
    private StatsService statsService;

    @Autowired
    private HealthStatistics stats;

    @Autowired
    private EmailService emailService ;

    @GetMapping("/averages")
    public ResponseEntity<Map<String, Double>> getAverageStats() {
        Long userId = 1L; // Default user ID

        Map<String, Double> averages = statsService.calculateAverages(userId);
        return ResponseEntity.ok(averages);
    }

    @GetMapping("/single-stats/{userId}")
    public ResponseEntity<StatisticsResult> getHealthData(@PathVariable Long userId) {
        StatisticsResult result = stats.calculateStatsForUser(userId);

        if (result == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(result);
    }


    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<String> sendSimpleEmail(
            @RequestParam String to,
            @RequestParam String subject,
            @RequestParam String messageBody,
            @RequestParam("file") MultipartFile attachment) {
        try {
            System.out.println(attachment.toString());
            emailService.sendSimpleEmail(to, subject, messageBody, attachment);
            return ResponseEntity.ok("Email sent successfully to " + to);
        } catch (MessagingException e) {
            return ResponseEntity.status(500).body("Failed to send email: " + e.getMessage());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
