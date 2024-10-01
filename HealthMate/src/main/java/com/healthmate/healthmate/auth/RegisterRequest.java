package com.healthmate.healthmate.auth;

import com.healthmate.healthmate.user.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class RegisterRequest {
    @NotEmpty(message = "firstname is mandatory")
    @NotBlank(message = "firstname is mandatory")
    private String firstname;
    @NotEmpty(message = "lastname is mandatory")
    @NotBlank(message = "lastname is mandatory")
    private String lastname;
    @NotEmpty(message = "email is mandatory")
    @NotBlank(message = "email is mandatory")
    private String email;
    @NotEmpty(message = "password is mandatory")
    @NotBlank(message = "password is mandatory")
    private String password;
    @NotEmpty(message = "phone number is mandatory")
    @NotBlank(message = "phone number is mandatory")
    private String phoneNumber;
    @NotEmpty(message = "address is mandatory")
    @NotBlank(message = "address is mandatory")
    private String address;
    private Role role;
}
