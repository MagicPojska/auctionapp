package com.atlantbh.auctionapp.security;

import com.atlantbh.auctionapp.model.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JsonWebToken {
    private static String jwtSecret;
    private static int jwtExpiration;

    @Value("${app.jwtSecret}")
    public void setJwtSecret(String jwtSecret) {
        JsonWebToken.jwtSecret = jwtSecret;
    }

    @Value("${app.jwtExpiration}")
    public static void setJwtExpiration(int jwtExpiration) {
        JsonWebToken.jwtExpiration = jwtExpiration;
    }

    public static String generateJWTToken(User user) {
        long timestamp = System.currentTimeMillis();
        return Jwts.builder()
                .setIssuedAt(new Date(timestamp))
                .setExpiration(new Date((new Date()).getTime() + jwtExpiration))
                .signWith(SignatureAlgorithm.ES256.HS256, jwtSecret)
                .claim("id", user.getId())
                .compact();
    }
}
