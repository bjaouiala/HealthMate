package com.healthmate.healthmate.predictIA;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class RiskAssessmentResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Unique ID for the result

    private Long healthIndiceId; // Foreign key to HealthIndice
    private String riskLevel; // Risk level

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getHealthIndiceId() {
        return healthIndiceId;
    }

    public void setHealthIndiceId(Long healthIndiceId) {
        this.healthIndiceId = healthIndiceId;
    }

    public String getRiskLevel() {
        return riskLevel;
    }

    public void setRiskLevel(String riskLevel) {
        this.riskLevel = riskLevel;
    }
}
