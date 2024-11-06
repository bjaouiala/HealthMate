package com.healthmate.healthmate.stats;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/health-indices")
public class StatsController {

    @Autowired
    private StatsService statsService;

    @Autowired
    private HealthStatistics stats;

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
}
