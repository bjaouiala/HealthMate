package com.healthmate.healthmate;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableJpaAuditing
@SpringBootApplication
@EnableAsync
@EnableScheduling
public class HealthMateApplication {

    public static void main(String[] args) {
        SpringApplication.run(HealthMateApplication.class, args);
    }

}
