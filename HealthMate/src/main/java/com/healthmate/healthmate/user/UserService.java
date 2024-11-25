package com.healthmate.healthmate.user;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    public UserResponse getUserByEmail(Authentication authentication) {
        User currentUser = (User) authentication.getPrincipal();
        User user = userRepository.findById(currentUser.getId()).orElseThrow(()->new EntityNotFoundException("no user found"));
        return UserResponse.builder()
                .email(user.getEmail())
                .address(user.getAddress())
                .id(user.getId())
                .enabled(user.isEnabled())
                .accountLocked(user.isAccountLocked())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .phoneNumber(user.getPhoneNumber())
                .build();

    }

    public Long updateUser(UserResponse userResponse, Authentication authentication) {
        User currentUser = (User) authentication.getPrincipal();
        User user = userRepository.findById(currentUser.getId()).orElseThrow(()->new EntityNotFoundException("no user found"));
        user.setAddress(userResponse.getAddress());
        user.setFirstname(userResponse.getFirstname());
        user.setLastname(userResponse.getLastname());
        user.setPhoneNumber(userResponse.getPhoneNumber());
        user.setPassword(passwordEncoder.encode(userResponse.getPassword()));
        return userRepository.save(user).getId();
    }
}
