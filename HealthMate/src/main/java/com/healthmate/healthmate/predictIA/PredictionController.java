package com.healthmate.healthmate.predictIA;

import com.healthmate.healthmate.HealthIndice.HealthIndice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/predict")
public class PredictionController {

    private final PredictionService predictionService;
    private final HealthIndicesRepository healthIndiceRepository; // Repository to fetch HealthIndice

    @Autowired
    public PredictionController(PredictionService predictionService, HealthIndicesRepository healthIndiceRepository) {
        this.predictionService = predictionService;
        this.healthIndiceRepository = healthIndiceRepository;
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> assessRisk(@PathVariable Long id) {
        // Retrieve the health index by ID
        HealthIndice healthIndice = healthIndiceRepository.findById(id).orElse(null);

        if (healthIndice == null) {
            // Return a custom error message with a 404 Not Found status
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("HealthIndice not found with id " + id);
        }

        // Call the service to get prediction and return response
        PredictionResponse predictionResponse = predictionService.getPrediction(healthIndice);
        return ResponseEntity.ok(predictionResponse);
    }
}

