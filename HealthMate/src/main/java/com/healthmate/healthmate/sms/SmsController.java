package com.healthmate.healthmate.sms;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalTime;

@RestController
@RequestMapping("/sms")
public class SmsController {

    private final SmsService smsService;

    @Autowired
    public SmsController(SmsService smsService) {
        this.smsService = smsService;
    }
    @PostMapping
    public void sendSms(@RequestBody SmsRequest smsRequest) {
        LocalTime currentTime = LocalTime.now();

        LocalTime startTime = LocalTime.of(8,0);
        LocalTime endTime = LocalTime.of(20,0);

        if (currentTime.isAfter(startTime) && currentTime.isBefore(endTime)) {
            smsService.sendSms(smsRequest);
        }
        else{
            System.out.println("SMS sending is not allowed at this time.");
        }
    }
}
