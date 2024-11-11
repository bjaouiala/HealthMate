package com.healthmate.healthmate.HealthChat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/health-indices/chat")
public class HealthProblemController {

    @Autowired
    private HealthProblemService service;

    @GetMapping
    public ResponseEntity<List<HealthProblem>> getAllProblems() {
        return ResponseEntity.ok(service.getAllProblems());
    }

    @GetMapping("/advice/{problem}")
    public ResponseEntity<String> getAdvice(@PathVariable String problem) {
        String advice = service.getAdvice(problem);
        return ResponseEntity.ok(advice);
    }
}