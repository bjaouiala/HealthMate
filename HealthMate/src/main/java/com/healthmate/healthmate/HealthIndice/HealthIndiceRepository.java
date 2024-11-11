package com.healthmate.healthmate.HealthIndice;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HealthIndiceRepository extends JpaRepository<HealthIndice, Long> {
    List<HealthIndice> findByUserId(Long userId); // Assuming you have a userId field in HealthIndice
}

