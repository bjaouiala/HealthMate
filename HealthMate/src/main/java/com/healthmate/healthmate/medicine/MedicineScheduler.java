package com.healthmate.healthmate.medicine;

import com.healthmate.healthmate.sms.SmsRequest;
import com.healthmate.healthmate.sms.SmsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;


@Component
public class MedicineScheduler {
    private final SmsService smsService;
    private final MedicineNotificationRepository notificationRepository;
    @Autowired
    public MedicineScheduler(SmsService smsService, MedicineNotificationRepository notificationRepository) {
        this.smsService = smsService;
        this.notificationRepository = notificationRepository;
    }
    @Scheduled(cron = "0 0 */6 * * *")
    //@Scheduled(cron = "0 */5 * * * *")
    public void scheduleMedicine() {
        SmsRequest smsRequest = new SmsRequest("+21625990803","Don't forget to take your medicine");
        smsService.sendSms(smsRequest);

        System.out.println("Scheduled SMS sent at: " + System.currentTimeMillis());

        MedicineNotification notification = new MedicineNotification(
                smsRequest.getPhone(),
                smsRequest.getMessage(),
                LocalDateTime.now()
        );
        this.notificationRepository.save(notification);
    }
}
