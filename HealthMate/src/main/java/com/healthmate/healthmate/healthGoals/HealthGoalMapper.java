package com.healthmate.healthmate.healthGoals;

import org.springframework.stereotype.Component;

@Component
public class HealthGoalMapper {

    public HealthGoal toEntity(HealthGoalRequestDTO dto) {
        HealthGoal goal = new HealthGoal();
        goal.setActualValue(dto.getActualValue());
        goal.setTargetValue(dto.getTargetValue());
        goal.setStartDate(dto.getStartDate());
        goal.setEndDate(dto.getEndDate());
        goal.setUserDescription(dto.getUserDescription());
        return goal;
    }

    public HealthGoalResponseDTO toResponseDTO(HealthGoal goal) {
        HealthGoalResponseDTO response = new HealthGoalResponseDTO();
        response.setId(goal.getId());
        response.setGoalTitle(goal.getPredefinedGoal().getTitle());
        response.setGoalDescription(goal.getPredefinedGoal().getDescription());
        response.setActualValue(goal.getActualValue());
        response.setTargetValue(goal.getTargetValue());
        response.setStartDate(goal.getStartDate());
        response.setEndDate(goal.getEndDate());
        response.setUserDescription(goal.getUserDescription());
        response.setStatus(goal.getStatus());
        response.setFirstName(goal.getUser().getFullName());
        return response;
    }
}
