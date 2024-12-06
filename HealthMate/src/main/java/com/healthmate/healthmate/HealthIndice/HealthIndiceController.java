package com.healthmate.healthmate.HealthIndice;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200") // Add this line

@RequestMapping("/health-indices")

public class HealthIndiceController {
    private final HealthIndiceService healthIndiceService;

    public HealthIndiceController(HealthIndiceService healthIndiceService) {
        this.healthIndiceService = healthIndiceService;
    }

    // Create a new health indice
    @PostMapping
    public ResponseEntity<HealthIndice> createHealthIndice(
            @RequestBody HealthIndice healthIndice,
            Authentication connectedUser) {

        // Call the service to create the health index
        HealthIndice createdHealthIndice = healthIndiceService.createHealthIndice(healthIndice, connectedUser);

        // Return response with created status and the created health index
        return ResponseEntity.status(HttpStatus.CREATED).body(createdHealthIndice);
    }

    // Get all health indices for a specific user
    @GetMapping("/user")
    public ResponseEntity<List<HealthIndice>> getAllHealthIndices(Authentication user) {
        List<HealthIndice> healthIndices = healthIndiceService.getAllHealthIndicesByUser(user);
        return ResponseEntity.ok(healthIndices);
    }

    // Get a single health indice by ID
    @GetMapping("/{id}")
    public ResponseEntity<HealthIndice> getHealthIndiceById(@PathVariable Long id) {
        HealthIndice healthIndice = healthIndiceService.getHealthIndiceById(id);
        return ResponseEntity.ok(healthIndice);
    }

    // Update a health indice
    @PutMapping("/{id}")
    public ResponseEntity<HealthIndice> updateHealthIndice(
            @PathVariable Long id,
            @RequestBody HealthIndice healthIndiceDetails) {
        HealthIndice updatedHealthIndice = healthIndiceService.updateHealthIndice(id, healthIndiceDetails);
        return ResponseEntity.ok(updatedHealthIndice);
    }

    // Delete a health indice
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHealthIndice(@PathVariable Long id) {
        healthIndiceService.deleteHealthIndice(id);
        return ResponseEntity.noContent().build();
    }
}
