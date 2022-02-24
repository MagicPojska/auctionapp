package com.atlantbh.auctionapp.security;

import com.atlantbh.auctionapp.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JsonWebToken {

    private static String appName;
    private static String jwtSecret;
    private static int jwtExpiration;
    private static SignatureAlgorithm SIGNATURE_ALGORITHM = SignatureAlgorithm.HS256;

    @Value("${app.app}")
    public void setAppName(String appName) {
        JsonWebToken.appName = appName;
    }

    @Value("${app.jwtSecret}")
    public void setJwtSecret(String jwtSecret) {
        JsonWebToken.jwtSecret = jwtSecret;
    }

    @Value("${app.jwtExpiration}")
    public void setJwtExpiration(int jwtExpiration) {
        JsonWebToken.jwtExpiration = jwtExpiration;
    }

    private static Date generateExpirationDate() {
        return new Date(new Date().getTime() + JsonWebToken.jwtExpiration * 1000);
    }

    private Claims getAllClaimsFromToken(String token) {
        Claims claims;
        try {
            claims = Jwts.parser()
                    .setSigningKey(jwtSecret)
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
            claims = null;
        }
        return claims;
    }

    public static String generateJWTToken(User user) {
        long timestamp = System.currentTimeMillis();
        return Jwts.builder()
                .setIssuer(appName)
                .setIssuedAt(new Date(timestamp))
                .setExpiration(generateExpirationDate())
                .signWith(SIGNATURE_ALGORITHM, jwtSecret)
                .claim("id", user.getId())
                .compact();
    }
}
