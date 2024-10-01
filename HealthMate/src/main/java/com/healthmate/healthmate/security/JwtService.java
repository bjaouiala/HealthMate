package com.healthmate.healthmate.security;

import com.healthmate.healthmate.user.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class JwtService {
    @Value("${application.security.jwt.secret-key}")
    private String secretKey;
    @Value("${application.security.jwt.expiration}")
    private long expiration;
    public String extractUsername(String token){
        return extractClaims(token, Claims::getSubject);
    }

    private <T> T extractClaims(String token, Function<Claims,T> getSubject) {
        Claims claims = extractAllClaims(token);
       return getSubject.apply(claims);
    }

    private Claims extractAllClaims(String jwt){
        return Jwts.parserBuilder().setSigningKey(getKey())
                .build()
                .parseClaimsJws(jwt)
                .getBody();
    }

    private Key getKey(){
       byte[] keyByte = Decoders.BASE64.decode(secretKey);
       return Keys.hmacShaKeyFor(keyByte);
    }

    public boolean isTokenValid(UserDetails userDetails, String jwt) {
        String username = extractUsername(jwt);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(jwt);

    }

    private boolean isTokenExpired(String jwt) {
        return extractExpiration(jwt).before(new Date());
    }

    private Date extractExpiration(String jwt) {
        return extractClaims(jwt,Claims::getExpiration);
    }


    public String generateToken(UserDetails user) {
        var authorities = user.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();
        return Jwts.builder().setSubject(user.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+expiration))
                .signWith(getKey())
                .claim("authorities",authorities)
                .compact();
    }
}
