package com.healthmate.healthmate.stats;

public class Statistics {
    private double mean;
    private double median;
    private double standardDeviation;

    public Statistics(double mean, double median, double standardDeviation) {
        this.mean = mean;
        this.median = median;
        this.standardDeviation = standardDeviation;
    }

    // Getters
    public double getMean() { return mean; }
    public double getMedian() { return median; }
    public double getStandardDeviation() { return standardDeviation; }
}
