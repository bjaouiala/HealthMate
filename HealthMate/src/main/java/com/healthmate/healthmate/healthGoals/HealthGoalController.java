package com.healthmate.healthmate.healthGoals;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/goals")
public class HealthGoalController {

    @Autowired
    private HealthGoalService healthGoalService;

    @GetMapping("/predefined")
    public List<PredefinedHealthGoal> getAllPredefinedGoals() {
        return healthGoalService.getAllPredefinedGoals();
    }

    @PostMapping("/predefined")
    public PredefinedHealthGoal createPredefinedGoal(@RequestBody PredefinedHealthGoalRequestDTO dto) {
        return healthGoalService.createPredefinedGoal(dto.getTitle(), dto.getDescription());
    }

    @PutMapping("/predefined/{id}")
    public PredefinedHealthGoal updatePredefinedGoal(
            @PathVariable Long id,
            @RequestBody PredefinedHealthGoalRequestDTO dto) {
        return healthGoalService.updatePredefinedGoal(id, dto.getTitle(), dto.getDescription());
    }

    @DeleteMapping("/predefined/{id}")
    public void deletePredefinedGoal(@PathVariable Long id) {
        healthGoalService.deletePredefinedGoal(id);
    }

    @PostMapping("/{predefinedGoalId}")
    public HealthGoalResponseDTO createHealthGoal(
            Authentication connctedUser,
            @PathVariable Long predefinedGoalId,
            @RequestBody HealthGoalRequestDTO dto) {
        return healthGoalService.createHealthGoal(connctedUser, predefinedGoalId, dto);
    }

    @GetMapping
    public List<HealthGoalResponseDTO> getHealthGoalsByUser(Authentication connctedUser) {
        return healthGoalService.getGoalsByUser(connctedUser);
    }

    @PutMapping("/{goalId}")
    public HealthGoalResponseDTO updateHealthGoal(
            Authentication connctedUser,
            @PathVariable Long goalId,
            @RequestBody HealthGoalRequestDTO dto) {
        return healthGoalService.updateHealthGoal(connctedUser, goalId, dto);
    }

    @DeleteMapping("/{userId}/{goalId}")
    public void deleteHealthGoal(@PathVariable Long userId, @PathVariable Long goalId) {
        healthGoalService.deleteHealthGoal(userId, goalId);
    }
}
