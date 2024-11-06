package com.healthmate.healthmate.predictIA;

import com.healthmate.healthmate.HealthIndice.HealthIndice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class PredictionService {

    private final String API_URL = "http://localhost:5000/api/risk/assess"; // Adjust the port if necessary

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private RiskAssessmentResultRepository resultRepository; // Repository for saving results

    public PredictionResponse getPrediction(HealthIndice request) {
        try {
            // Make a POST request and map the response to PredictionResponse class
            ResponseEntity<PredictionResponse> responseEntity = restTemplate.postForEntity(API_URL, request, PredictionResponse.class);

            if (responseEntity.getStatusCode() == HttpStatus.OK) {
                PredictionResponse predictionResponse = responseEntity.getBody();

                // Save the risk assessment result with health index ID
                saveRiskAssessmentResult(request.getId(), predictionResponse.getRiskLevel());

                return predictionResponse; // Return the response from the API
            } else {
                // Handle error response if needed
                throw new RuntimeException("Failed to assess risk: " + responseEntity.getStatusCode());
            }
        } catch (Exception e) {
            // Log exception and handle it appropriately
            throw new RuntimeException("Error during risk assessment: " + e.getMessage(), e);
        }
    }

    private void saveRiskAssessmentResult(Long healthIndiceId, String riskLevel) {
        RiskAssessmentResult result = new RiskAssessmentResult();
        result.setHealthIndiceId(healthIndiceId);
        result.setRiskLevel(riskLevel);

        resultRepository.save(result); // Save the result in the database
    }
}



