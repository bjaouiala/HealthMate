package com.healthmate.healthmate.stats;

public class StatisticsResult {
    private Statistics ageStats;
    private Statistics systolicBPStats;
    private Statistics diastolicBPStats;
    private Statistics bloodSugarStats;
    private Statistics bodyTemperatureStats;
    private Statistics heartRateStats;

    // Getters and Setters
    public Statistics getAgeStats() { return ageStats; }
    public void setAgeStats(Statistics ageStats) { this.ageStats = ageStats; }

    public Statistics getSystolicBPStats() { return systolicBPStats; }
    public void setSystolicBPStats(Statistics systolicBPStats) { this.systolicBPStats = systolicBPStats; }

    public Statistics getDiastolicBPStats() { return diastolicBPStats; }
    public void setDiastolicBPStats(Statistics diastolicBPStats) { this.diastolicBPStats = diastolicBPStats; }

    public Statistics getBloodSugarStats() { return bloodSugarStats; }
    public void setBloodSugarStats(Statistics bloodSugarStats) { this.bloodSugarStats = bloodSugarStats; }

    public Statistics getBodyTemperatureStats() { return bodyTemperatureStats; }
    public void setBodyTemperatureStats(Statistics bodyTemperatureStats) { this.bodyTemperatureStats = bodyTemperatureStats; }

    public Statistics getHeartRateStats() { return heartRateStats; }
    public void setHeartRateStats(Statistics heartRateStats) { this.heartRateStats = heartRateStats; }
}
