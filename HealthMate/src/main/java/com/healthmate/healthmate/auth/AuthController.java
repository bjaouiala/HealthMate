package com.healthmate.healthmate.auth;

import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationService authService;

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> auth(@Valid @RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(authService.auth(request));
    }

    @PostMapping("/register")
    public ResponseEntity<Long> register(@Valid @RequestBody RegisterRequest request) throws MessagingException {
        return ResponseEntity.ok(authService.register(request));
    }

    @GetMapping("/activation-account")
    public ResponseEntity<?> confirmAccount(@RequestParam String token) throws MessagingException {
        authService.activateAccount(token);
        return ResponseEntity.accepted().build();
    }

    @PostMapping("/resent-CodeConfirmation")
    public ResponseEntity<?> resentConfirmationToken(@RequestBody String email) throws MessagingException {
        authService.resentConfirmationToken(email);
        return ResponseEntity.accepted().build();
    }

}
