package com.healthmate.healthmate.HealthChat;

import org.springframework.data.jpa.repository.JpaRepository;

public interface HealthProblemRepository extends JpaRepository<HealthProblem, Long> {
    HealthProblem findByProblem(String problem);
}
