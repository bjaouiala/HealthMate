package com.healthmate.healthmate.handler;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum BusinessError {
    ENTITY_NOT_FOUND(404, HttpStatus.NOT_FOUND,"this entity not found"),
    ACCOUNT_LOCKED(300, HttpStatus.FORBIDDEN,"this account is locked"),
    ACCOUNT_DISABLED(301,HttpStatus.FORBIDDEN,"this account is disabled"),
    BAD_CREDENTIALS(302,HttpStatus.FORBIDDEN,"email or password incorrect"),
    INCORRECT_CURRENT_PASSWORD(303,HttpStatus.BAD_REQUEST,"current password is incorrect"),
    NEW_PASSWORD_DOES_NOT_MATCH(304,HttpStatus.BAD_REQUEST,"the new password does not match");
    private final Integer code;
    private final HttpStatus httpStatus;
    private final String description;

    BusinessError(Integer code, HttpStatus httpStatus, String description) {
        this.code = code;
        this.httpStatus = httpStatus;
        this.description = description;
    }
}
