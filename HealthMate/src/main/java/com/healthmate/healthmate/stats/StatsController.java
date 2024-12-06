package com.healthmate.healthmate.stats;

import com.healthmate.healthmate.email.EmailService;
import com.healthmate.healthmate.user.User;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
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
    public ResponseEntity<Map<String, Double>> getAverageStats(Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();

        Map<String, Double> averages = statsService.calculateAverages(user.getId());
        return ResponseEntity.ok(averages);
    }

    @GetMapping("/single-stats")
    public ResponseEntity<StatisticsResult> getHealthData(Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();
        StatisticsResult result = stats.calculateStatsForUser(user.getId());

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
