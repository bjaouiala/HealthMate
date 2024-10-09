package com.healthmate.healthmate.sms;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;

public class SmsRequest {

    @NotBlank
    private String phone;
    @NotBlank
    private final String message;

    public SmsRequest(@JsonProperty("phone") String phone, @JsonProperty("message") String message) {
        this.phone = phone;
        this.message = message;
    }

    public String getPhone() {
        return phone;
    }

    public String getMessage() {
        return message;
    }

    @Override
    public String toString() {
        return "SmsRequest{" +
                "phone='" + phone + '\'' +
                ", message='" + message + '\'' +
                '}';
    }
}
