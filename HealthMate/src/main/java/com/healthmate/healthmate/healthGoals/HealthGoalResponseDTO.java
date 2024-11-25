package com.healthmate.healthmate.healthGoals;

import lombok.Data;

import java.time.LocalDate;

@Data
public class HealthGoalResponseDTO {
    private Long id;
    private String goalTitle;
    private String goalDescription;
    private Double actualValue;
    private Double targetValue;
    private LocalDate startDate;
    private LocalDate endDate;
    private String userDescription;
    private String status;
    private String firstName;
}
