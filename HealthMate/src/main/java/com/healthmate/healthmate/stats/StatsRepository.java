package com.healthmate.healthmate.stats;

import com.healthmate.healthmate.HealthIndice.HealthIndice;
import com.healthmate.healthmate.user.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatsRepository extends CrudRepository<HealthIndice, Long> {

    @Query("SELECT AVG(h.age) FROM HealthIndice h WHERE h.user.id = :userId")
    Double findAvgAgeByUserId(Long userId);

    @Query("SELECT AVG(h.systolicBP) FROM HealthIndice h WHERE h.user.id = :userId")
    Double findAvgSystolicBPByUserId(Long userId);

    @Query("SELECT AVG(h.diastolicBP) FROM HealthIndice h WHERE h.user.id = :userId")
    Double findAvgDiastolicBPByUserId(Long userId);

    @Query("SELECT AVG(h.bs) FROM HealthIndice h WHERE h.user.id = :userId")
    Double findAvgBsByUserId(Long userId);

    @Query("SELECT AVG(h.bodyTemp) FROM HealthIndice h WHERE h.user.id = :userId")
    Double findAvgBodyTempByUserId(Long userId);

    @Query("SELECT AVG(h.heartRate) FROM HealthIndice h WHERE h.user.id = :userId")
    Double findAvgHeartRateByUserId(Long userId);
}
