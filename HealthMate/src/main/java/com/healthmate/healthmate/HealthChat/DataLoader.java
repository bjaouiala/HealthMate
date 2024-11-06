package com.healthmate.healthmate.HealthChat;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {
    private final HealthProblemRepository repository;

    public DataLoader(HealthProblemRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) throws Exception {
        // High Systolic Blood Pressure
        repository.deleteAll();
        repository.save(new HealthProblem("High Systolic Blood Pressure",
                "1. **Dietary Changes**: Reduce sodium intake to less than 2,300 mg per day. Focus on a diet rich in fruits, vegetables, and whole grains.\n" +
                        "2. **Regular Exercise**: Engage in at least 150 minutes of moderate aerobic activity each week.\n" +
                        "3. **Weight Management**: Maintain a healthy weight; even a small weight loss can help lower your blood pressure.\n" +
                        "4. **Limit Alcohol**: Reduce alcohol consumption to no more than one drink per day for women and two for men.\n" +
                        "5. **Regular Monitoring**: Check your blood pressure regularly to track your progress."));

        // High Diastolic Blood Pressure
        repository.save(new HealthProblem("High Diastolic Blood Pressure",
                "1. **Reduce Sodium Intake**: Limit salt in your diet; consider using herbs and spices for flavoring.\n" +
                        "2. **Increase Physical Activity**: Aim for regular exercise like walking, cycling, or swimming.\n" +
                        "3. **Manage Stress**: Practice relaxation techniques such as yoga or meditation to lower stress levels.\n" +
                        "4. **Healthy Diet**: Incorporate potassium-rich foods like bananas and spinach into your diet.\n" +
                        "5. **Consult a Doctor**: If high readings persist, consult a healthcare professional for further evaluation."));

        // High Blood Sugar
        repository.save(new HealthProblem("High Blood Sugar",
                "1. **Dietary Adjustments**: Cut back on sugary foods and refined carbohydrates; focus on whole grains and fiber-rich foods.\n" +
                        "2. **Regular Exercise**: Aim for at least 150 minutes of moderate exercise weekly to help control blood sugar levels.\n" +
                        "3. **Monitor Levels**: Regularly check your blood sugar levels to understand how different foods affect you.\n" +
                        "4. **Medication Compliance**: If prescribed, take diabetes medications as directed by your healthcare provider.\n" +
                        "5. **Consult a Dietitian**: Work with a dietitian to create a personalized meal plan tailored to your needs."));

        // Elevated Body Temperature
        repository.save(new HealthProblem("Elevated Body Temperature",
                "1. **Stay Hydrated**: Drink plenty of fluids like water or electrolyte solutions to prevent dehydration.\n" +
                        "2. **Rest**: Ensure adequate rest; avoid strenuous activities until your temperature normalizes.\n" +
                        "3. **Medication**: Consider taking over-the-counter medications like acetaminophen or ibuprofen to reduce fever as directed.\n" +
                        "4. **Monitor Symptoms**: Keep track of other symptoms; if fever persists beyond three days or worsens, seek medical attention.\n" +
                        "5. **Cool Down**: Use cool compresses or take lukewarm baths to help reduce body temperature."));

        // Abnormal Heart Rate
        repository.save(new HealthProblem("Abnormal Heart Rate",
                "1. **Regular Monitoring**: Keep track of your heart rate regularly; use a heart rate monitor if necessary.\n" +
                        "2. **Healthy Lifestyle Choices**: Incorporate regular exercise and maintain a balanced diet low in saturated fats and sugars.\n" +
                        "3. **Stress Management Techniques**: Practice relaxation techniques such as yoga or meditation to reduce stress levels that may affect heart rate.\n" +
                        "4. **Limit Caffeine and Alcohol**: Reduce intake of stimulants like caffeine and alcohol that can elevate heart rate.\n" +
                        "5. **Consult a Healthcare Provider**: If you experience persistent irregularities in heart rate (too high or too low), consult a healthcare professional for evaluation."));

        // Add more health problems and advice as needed.
    }
}
