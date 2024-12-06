package com.healthmate.healthmate.HealthIndice;

import com.healthmate.healthmate.user.User;
import com.healthmate.healthmate.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HealthIndiceService {
    @Autowired
    private HealthIndiceRepository healthIndiceRepository;
    @Autowired
    private UserRepository userRepository ;

    // Get all health indices for a specific user
    public List<HealthIndice> getAllHealthIndicesByUser(Authentication userId) {
        User user = (User) userId.getPrincipal() ;
        return healthIndiceRepository.findByUserId(user.getId()); // Fetch indices for the specific user
    }

    // Get a single health indice by its ID
    public HealthIndice getHealthIndiceById(Long id) {
        return healthIndiceRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Health Indice not found with id: " + id));
    }

    @Transactional
    public HealthIndice createHealthIndice(HealthIndice healthIndice, Authentication connectedUser) {
        User userId = (User) connectedUser.getPrincipal() ;
        User user = userRepository.findById(userId.getId()).orElseThrow(()->new EntityNotFoundException("not found"));

        healthIndice.setUser(user);
        return healthIndiceRepository.save(healthIndice);
    }


    // Update an existing health indice
    public HealthIndice updateHealthIndice(Long id, HealthIndice healthIndiceDetails) {
        HealthIndice healthIndice = getHealthIndiceById(id);

        // Update fields based on healthIndiceDetails
        healthIndice.setAge(healthIndiceDetails.getAge());
        healthIndice.setSystolicBP(healthIndiceDetails.getSystolicBP());
        healthIndice.setDiastolicBP(healthIndiceDetails.getDiastolicBP());
        healthIndice.setBs(healthIndiceDetails.getBs());
        healthIndice.setBodyTemp(healthIndiceDetails.getBodyTemp());
        healthIndice.setHeartRate(healthIndiceDetails.getHeartRate());

        return healthIndiceRepository.save(healthIndice);
    }

    // Delete a health indice by ID
    public void deleteHealthIndice(Long id) {
        HealthIndice healthIndice = getHealthIndiceById(id);
        healthIndiceRepository.delete(healthIndice);
    }
}
