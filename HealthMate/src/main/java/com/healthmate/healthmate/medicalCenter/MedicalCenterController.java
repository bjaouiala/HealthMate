package com.healthmate.healthmate.medicalCenter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/medical-centers")
public class MedicalCenterController {

    @Autowired
    private MedicalCenterService service;

    @GetMapping
    public List<MedicalCenter> getAllMedicalCenters() {
        return service.getAllMedicalCenters();
    }

    @PostMapping
    public MedicalCenter addMedicalCenter(@RequestBody MedicalCenter center) {
        return service.addMedicalCenter(center);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MedicalCenter> updateMedicalCenter(
            @PathVariable Long id, @RequestBody MedicalCenter updatedCenter) {
        try {
            MedicalCenter updated = service.updateMedicalCenter(id, updatedCenter);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedicalCenter(@PathVariable Long id) {
        service.deleteMedicalCenter(id);
        return ResponseEntity.noContent().build();
    }
}
