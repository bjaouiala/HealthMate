package com.healthmate.healthmate.healthGoals;

import com.healthmate.healthmate.user.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "health_goals")
@Data
@NoArgsConstructor
public class HealthGoal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "predefined_goal_id")
    private PredefinedHealthGoal predefinedGoal;

    private Double actualValue;
    private Double targetValue;
    private LocalDate startDate;
    private LocalDate endDate;
    private String userDescription;
    private String status;
}
