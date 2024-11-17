package com.healthmate.healthmate.healthGoals;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface HealthGoalRepository extends JpaRepository<HealthGoal, Long> {
    List<HealthGoal> findByUserId(Long userId);
    Optional<HealthGoal> findByIdAndUserId(Long goalId, Long userId);
}

