package com.healthmate.healthmate.predictIA;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class PredictionResponse {
    @JsonProperty("risk_level")

    private String riskLevel;
    @JsonProperty("feedback")

    private List<String> feedback;

    // Getters and setters
    public String getRiskLevel() { return riskLevel; }
    public void setRiskLevel(String riskLevel) { this.riskLevel = riskLevel; }

    public List<String> getFeedback() { return feedback; }
    public void setFeedback(List<String> feedback) { this.feedback = feedback; }
}

