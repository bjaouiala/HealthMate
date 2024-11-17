package com.healthmate.healthmate.healthGoals;

import lombok.Data;

import java.time.LocalDate;

@Data
public class HealthGoalRequestDTO {
    private Double actualValue;
    private Double targetValue;
    private LocalDate startDate;
    private LocalDate endDate;
    private String userDescription;
}
