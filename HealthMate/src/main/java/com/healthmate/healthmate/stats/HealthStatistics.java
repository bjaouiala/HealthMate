package com.healthmate.healthmate.stats;

import com.healthmate.healthmate.HealthIndice.HealthIndice;
import com.healthmate.healthmate.HealthIndice.HealthIndiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HealthStatistics {

    @Autowired
    private HealthIndiceRepository healthIndiceRepository;

    // Method to calculate statistics for a specific user
    public StatisticsResult calculateStatsForUser(Long userId) {
        List<HealthIndice> healthIndices = healthIndiceRepository.findByUserId(userId);

        if (healthIndices == null || healthIndices.isEmpty()) {
            return null; // Or throw an exception based on your needs
        }

        StatisticsResult result = new StatisticsResult();

        // Calculate stats for each attribute
        result.setAgeStats(calculateStatistics(healthIndices.stream().map(HealthIndice::getAge).collect(Collectors.toList())));
        result.setSystolicBPStats(calculateStatistics(healthIndices.stream().map(HealthIndice::getSystolicBP).collect(Collectors.toList())));
        result.setDiastolicBPStats(calculateStatistics(healthIndices.stream().map(HealthIndice::getDiastolicBP).collect(Collectors.toList())));
        result.setBloodSugarStats(calculateStatistics(healthIndices.stream().map(HealthIndice::getBs).collect(Collectors.toList())));
        result.setBodyTemperatureStats(calculateStatistics(healthIndices.stream().map(HealthIndice::getBodyTemp).collect(Collectors.toList())));
        result.setHeartRateStats(calculateStatistics(healthIndices.stream().map(HealthIndice::getHeartRate).collect(Collectors.toList())));

        return result;
    }

    private Statistics calculateStatistics(List<Double> values) {
        double mean = values.stream().mapToDouble(Double::doubleValue).average().orElse(0.0);
        double median = calculateMedian(values);
        double stdDev = calculateStandardDeviation(values, mean);

        return new Statistics(mean, median, stdDev);
    }

    private double calculateMedian(List<Double> values) {
        int size = values.size();
        List<Double> sortedValues = values.stream().sorted().collect(Collectors.toList());

        if (size % 2 == 0) {
            return (sortedValues.get(size / 2 - 1) + sortedValues.get(size / 2)) / 2.0;
        } else {
            return sortedValues.get(size / 2);
        }
    }

    private double calculateStandardDeviation(List<Double> values, double mean) {
        double variance = values.stream()
                .mapToDouble(value -> Math.pow(value - mean, 2))
                .average()
                .orElse(0.0);

        return Math.sqrt(variance);
    }
}

