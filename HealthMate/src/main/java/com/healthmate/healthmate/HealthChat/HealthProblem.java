package com.healthmate.healthmate.HealthChat;

import jakarta.persistence.*;

@Entity
public class HealthProblem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String problem; // e.g., "High Systolic Blood Pressure"
    @Column(columnDefinition="text")
    private String advice; // Specific advice for the problem


    public HealthProblem(){}
    public HealthProblem(String problem, String advice) {
        this.problem = problem;
        this.advice = advice;
    }

        // Constructors, Getters, and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProblem() {
        return problem;
    }

    public void setProblem(String problem) {
        this.problem = problem;
    }

    public String getAdvice() {
        return advice;
    }

    public void setAdvice(String advice) {
        this.advice = advice;
    }
}
