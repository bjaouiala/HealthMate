package com.healthmate.healthmate.medicalCenter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MedicalCenterService {
    @Autowired
    private MedicalCenterRepository repository;

    public List<MedicalCenter> getAllMedicalCenters() {
        return repository.findAll();
    }

    public MedicalCenter addMedicalCenter(MedicalCenter center) {
        return repository.save(center);
    }

    public MedicalCenter updateMedicalCenter(Long id, MedicalCenter updatedCenter) {
        Optional<MedicalCenter> existingCenterOpt = repository.findById(id);
        if (existingCenterOpt.isPresent()) {
            MedicalCenter existingCenter = existingCenterOpt.get();
            existingCenter.setName(updatedCenter.getName());
            existingCenter.setLat(updatedCenter.getLat());
            existingCenter.setLng(updatedCenter.getLng());
            return repository.save(existingCenter);
        } else {
            throw new IllegalArgumentException("Medical Center with ID " + id + " not found");
        }
    }

    public void deleteMedicalCenter(Long id) {
        repository.deleteById(id);
    }
}
