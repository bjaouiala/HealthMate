package com.healthmate.healthmate.healthGoals;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "predefined_health_goals")
@Data
@NoArgsConstructor
public class PredefinedHealthGoal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
}
