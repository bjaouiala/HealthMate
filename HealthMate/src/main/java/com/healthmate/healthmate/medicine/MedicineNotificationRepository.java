package com.healthmate.healthmate.medicine;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicineNotificationRepository  extends CrudRepository<MedicineNotification, Long> {
}
