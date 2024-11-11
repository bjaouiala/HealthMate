package com.healthmate.healthmate.predictIA;

import com.healthmate.healthmate.HealthIndice.HealthIndice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HealthIndicesRepository extends JpaRepository<HealthIndice, Long> {
}
