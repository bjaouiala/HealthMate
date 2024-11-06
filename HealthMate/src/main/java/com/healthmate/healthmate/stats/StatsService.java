package com.healthmate.healthmate.stats;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class StatsService {

    @Autowired
    private StatsRepository statsRepository;

    public Map<String, Double> calculateAverages(Long userId) {
        Map<String, Double> averages = new HashMap<>();
        averages.put("age", statsRepository.findAvgAgeByUserId(userId));
        averages.put("systolicBP", statsRepository.findAvgSystolicBPByUserId(userId));
        averages.put("diastolicBP", statsRepository.findAvgDiastolicBPByUserId(userId));
        averages.put("bs", statsRepository.findAvgBsByUserId(userId));
        averages.put("bodyTemp", statsRepository.findAvgBodyTempByUserId(userId));
        averages.put("heartRate", statsRepository.findAvgHeartRateByUserId(userId));
        return averages;
    }


}
