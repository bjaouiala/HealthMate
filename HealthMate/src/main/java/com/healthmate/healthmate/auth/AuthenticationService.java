package com.healthmate.healthmate.auth;

import com.healthmate.healthmate.email.EmailService;
import com.healthmate.healthmate.security.JwtService;
import com.healthmate.healthmate.user.Token;
import com.healthmate.healthmate.user.TokenRepository;
import com.healthmate.healthmate.user.User;
import com.healthmate.healthmate.user.UserRepository;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthenticationService {
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserMapper userMapper;
    private final EmailService emailService;
    @Value("${application.mailing.frontend.activation-url}")
    private String confirmUrl;
    private final TokenRepository tokenRepository;


    public AuthenticationResponse auth(AuthenticationRequest request) {
        log.info(request.getEmail()+request.getPassword());
        var auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
        ));
        log.info("test2"+request.getEmail()+request.getPassword());
        User user = (User) auth.getPrincipal();
        String jwt = jwtService.generateToken(user);
        return AuthenticationResponse.builder().token(jwt).build();

    }

    public Long register(RegisterRequest request) throws MessagingException {
        User user = userMapper.toUser(request);
        userRepository.save(user);
        sendUserValidationAccount(user);
        return user.getId();
    }

    private void sendUserValidationAccount(User user) throws MessagingException {
        String subject = "please confirm your account";
        String codeConfirmation = generateAndSaveActivationToken(user);
        log.info("codeCofirmation"+codeConfirmation);
        emailService.senEmail(user.getEmail(),subject,user.getFullName(),confirmUrl,codeConfirmation);

    }

    private String generateAndSaveActivationToken(User user) {
        String token = generateActivationCode(6);
        var savedtoken = Token
                .builder()
                .token(token)
                .expiresAt(LocalDateTime.now().plusMinutes(15))
                .user(user)
                .build();
        tokenRepository.save(savedtoken);
        return token ;
    }
    private String generateActivationCode(int length) {
        String characters = "0123456789";
        StringBuilder codeBuilder = new StringBuilder();
        SecureRandom secureRandom = new SecureRandom();
        for (int i = 0; i < length ; i++){
            int index= secureRandom.nextInt(characters.length());
            codeBuilder.append(characters.charAt(index));
        }
        return codeBuilder.toString();
    }

    public void activateAccount(String token) throws MessagingException {
        Token token1 = tokenRepository.findByToken(token).orElseThrow(()-> new RuntimeException("token not found"));
        if (LocalDateTime.now().isAfter(token1.getExpiresAt())){
            sendUserValidationAccount(token1.getUser());
            throw new RuntimeException("token has been expired please check your email again for new token");
        }
        User user = userRepository.findById(token1.getUser().getId()).orElseThrow(()-> new RuntimeException("user not found for the given token"));
        user.setEnabled(true);
        userRepository.save(user);
        token1.setValidateAt(LocalDateTime.now());
        tokenRepository.save(token1);

    }

    public void resentConfirmationToken(String email) throws MessagingException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(()->new RuntimeException("user not found"));
        if (!user.isEnabled()){
            sendUserValidationAccount(user);
        }
    }
}
