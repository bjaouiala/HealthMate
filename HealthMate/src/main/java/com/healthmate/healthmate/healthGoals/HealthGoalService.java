package com.healthmate.healthmate.healthGoals;

import com.healthmate.healthmate.user.User;
import com.healthmate.healthmate.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class HealthGoalService {

    @Autowired
    private HealthGoalRepository healthGoalRepository;

    @Autowired
    private PredefinedHealthGoalRepository predefinedHealthGoalRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HealthGoalMapper healthGoalMapper;

    public List<PredefinedHealthGoal> getAllPredefinedGoals() {
        return predefinedHealthGoalRepository.findAll();
    }

    public PredefinedHealthGoal createPredefinedGoal(String title, String description) {
        PredefinedHealthGoal goal = new PredefinedHealthGoal();
        goal.setTitle(title);
        goal.setDescription(description);
        return predefinedHealthGoalRepository.save(goal);
    }

    public PredefinedHealthGoal updatePredefinedGoal(Long id, String title, String description) {
        PredefinedHealthGoal predefinedGoal = predefinedHealthGoalRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Predefined Health Goal with ID " + id + " not found"));

        predefinedGoal.setTitle(title);
        predefinedGoal.setDescription(description);

        return predefinedHealthGoalRepository.save(predefinedGoal);
    }

    public void deletePredefinedGoal(Long id) {
        predefinedHealthGoalRepository.deleteById(id);
    }

    public HealthGoalResponseDTO createHealthGoal(Long userId, Long predefinedGoalId, HealthGoalRequestDTO dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID " + userId));

        PredefinedHealthGoal predefinedGoal = predefinedHealthGoalRepository.findById(predefinedGoalId)
                .orElseThrow(() -> new EntityNotFoundException("Predefined goal not found with ID " + predefinedGoalId));

        validateDates(dto.getStartDate(), dto.getEndDate());

        HealthGoal goal = healthGoalMapper.toEntity(dto);
        goal.setUser(user);
        goal.setPredefinedGoal(predefinedGoal);
        goal.setStatus(determineGoalStatus(goal));

        HealthGoal savedGoal = healthGoalRepository.save(goal);
        return healthGoalMapper.toResponseDTO(savedGoal);
    }

    private String determineGoalStatus(HealthGoal goal) {
        if (goal.getActualValue() == null || goal.getTargetValue() == null || goal.getStartDate() == null || goal.getEndDate() == null) {
            return "Pending";
        }

        LocalDate today = LocalDate.now();

        if (goal.getActualValue().equals(goal.getTargetValue())) {
            return "Achieved";
        } else if (today.isAfter(goal.getEndDate())) {
            return "Failed";
        } else {
            return "In Progress";
        }
    }

    public List<HealthGoalResponseDTO> getGoalsByUser(Long userId) {
        return healthGoalRepository.findByUserId(userId).stream()
                .map(healthGoalMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    private void validateDates(LocalDate startDate, LocalDate endDate) {
        LocalDate today = LocalDate.now();

        if (startDate.isBefore(today)) {
            throw new IllegalArgumentException("Start date cannot be before today's date.");
        }

        if (endDate.isBefore(startDate) || endDate.isEqual(startDate)) {
            throw new IllegalArgumentException("End date must be after the start date.");
        }
    }

    public HealthGoalResponseDTO updateHealthGoal(Long userId, Long goalId, HealthGoalRequestDTO dto) {
        HealthGoal goal = healthGoalRepository.findByIdAndUserId(goalId, userId)
                .orElseThrow(() -> new EntityNotFoundException("Health goal not found for the given user and goal ID."));

        validateDates(dto.getStartDate(), dto.getEndDate());

        goal.setActualValue(dto.getActualValue());
        goal.setTargetValue(dto.getTargetValue());
        goal.setStartDate(dto.getStartDate());
        goal.setEndDate(dto.getEndDate());
        goal.setUserDescription(dto.getUserDescription());
        goal.setStatus(determineGoalStatus(goal));

        HealthGoal updatedGoal = healthGoalRepository.save(goal);
        return healthGoalMapper.toResponseDTO(updatedGoal);
    }

    public void deleteHealthGoal(Long userId, Long goalId) {
        HealthGoal goal = healthGoalRepository.findByIdAndUserId(goalId, userId)
                .orElseThrow(() -> new EntityNotFoundException("Health goal not found for the given user and goal ID."));
        healthGoalRepository.delete(goal);
    }
}
