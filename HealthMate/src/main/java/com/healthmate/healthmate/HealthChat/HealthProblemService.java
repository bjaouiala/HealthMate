package com.healthmate.healthmate.HealthChat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HealthProblemService {

    @Autowired
    private HealthProblemRepository repository;

    public List<HealthProblem> getAllProblems() {
        return repository.findAll();
    }

    public String getAdvice(String problem) {
        HealthProblem healthProblem = repository.findByProblem(problem);
        return healthProblem != null ? healthProblem.getAdvice() : "No advice available for this problem.";
    }
}
