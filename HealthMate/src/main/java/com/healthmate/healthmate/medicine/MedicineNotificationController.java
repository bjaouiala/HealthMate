package com.healthmate.healthmate.medicine;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/notificationMed")
public class MedicineNotificationController {

    private MedicineNotificationRepository medicineNotificationRepository;
    @Autowired
    public MedicineNotificationController(MedicineNotificationRepository medicineNotificationRepository) {
        this.medicineNotificationRepository = medicineNotificationRepository;
    }

    @GetMapping
    public List<MedicineNotification> getMedicineNotifications() {
        return (List<MedicineNotification>) medicineNotificationRepository.findAll();
    }
}
