package com.healthmate.healthmate.medicalCenter;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class MedicalCenter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private double lat;

    private double lng;
}
