package com.pasifcode.caxias_diary.application.security;

import com.pasifcode.caxias_diary.domain.entity.User;
import com.pasifcode.caxias_diary.application.exception.InvalidTokenException;
import org.springframework.beans.factory.annotation.Autowired;
import io.jsonwebtoken.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtHelper {

    @Autowired
    private SecretKeyGenerator keyGenerator;

    public AccessToken generateToken(User user){
        var key = keyGenerator.getKey();
        var expirationDate = generateExpirationDate();
        var claims = generateTokenClaims(user);

        String token = Jwts
                .builder()
                .signWith(key)
                .subject(user.getEmail())
                .expiration(expirationDate)
                .claims(claims)
                .compact();

        return new AccessToken(token);
    }

    private Date generateExpirationDate(){
        var expirationMinutes  = 120;
        LocalDateTime now = LocalDateTime.now().plusMinutes(expirationMinutes);
        return Date.from(now.atZone(ZoneId.systemDefault()).toInstant());
    }

    private Map<String, Object> generateTokenClaims(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", user.getId());
        claims.put("username", user.getUsername());
        claims.put("userImage", user.getImage());
        return claims;
    }

    public String getEmailFromToken(String tokenJwt) throws InvalidTokenException {
        try {
            JwtParser build = Jwts.parser()
                    .verifyWith(keyGenerator.getKey())
                    .build();
            Jws<Claims> jwsClaims = build.parseSignedClaims(tokenJwt);
            Claims claims = jwsClaims.getPayload();
            return claims.getSubject();
        } catch (JwtException e){
            throw new InvalidTokenException(e.getMessage());
        }
    }
}
