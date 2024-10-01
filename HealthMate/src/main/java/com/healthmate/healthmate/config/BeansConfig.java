package com.healthmate.healthmate.config;

import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.Collections;

@Configuration
@RequiredArgsConstructor
public class BeansConfig {
    private final UserDetailsService userDetailsService;

    @Bean
    public PasswordEncoder passwordEncoder(){return new BCryptPasswordEncoder();}

    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider auth = new DaoAuthenticationProvider();
        auth.setUserDetailsService(userDetailsService);
        auth.setPasswordEncoder(passwordEncoder());
        return auth;
    }


    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
         return configuration.getAuthenticationManager();
    }

    @Bean
    public CorsFilter corsFilter(){
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        final CorsConfiguration configuration =new CorsConfiguration();
         configuration.setAllowedOrigins(Collections.singletonList("http://localhost:4200"));
         configuration.setAllowCredentials(true);
         configuration.setAllowedHeaders(Arrays.asList(
                 HttpHeaders.AUTHORIZATION,
                 HttpHeaders.CONTENT_TYPE,
                 HttpHeaders.ORIGIN
         ));
         configuration.setAllowedMethods(Arrays.asList("POST",
                 "GET",
                 "PATCH",
                 "PUT",
                 "DELETE"));

         source.registerCorsConfiguration("/**",configuration);
         return new CorsFilter(source);

    }


}
