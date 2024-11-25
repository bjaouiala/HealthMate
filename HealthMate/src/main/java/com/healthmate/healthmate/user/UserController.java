package com.healthmate.healthmate.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("users")
public class UserController {
    private final UserService userService;
    @GetMapping
    public ResponseEntity<UserResponse> getUserByEmail(Authentication authentication){
        return ResponseEntity.ok(userService.getUserByEmail(authentication));
    }

    @PatchMapping
    public ResponseEntity<Long> updateUser(@RequestBody UserResponse userResponse,Authentication authentication){
        return ResponseEntity.ok(userService.updateUser(userResponse,authentication));
    }
}
