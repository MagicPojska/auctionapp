package com.atlantbh.auctionapp.security;

import com.atlantbh.auctionapp.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

@Component
public class JsonWebToken {

    private static String appName;
    private static String jwtSecret;
    private static int jwtExpiration;
    private static SignatureAlgorithm SIGNATURE_ALGORITHM = SignatureAlgorithm.HS256;

    @Value("${app.appName}")
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

    private static Claims getAllClaimsFromToken(String token) {
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

    public String getIdFromToken(String token) {
        String id;
        try {
            final Claims claims = this.getAllClaimsFromToken(token);
            id = claims.getSubject();
        } catch (Exception e) {
            id = null;
        }
        return id;
    }

    private Date getExpirationDate(String token) {
        Date expireDate;
        try {
            final Claims claims = this.getAllClaimsFromToken(token);
            expireDate = claims.getExpiration();
        } catch (Exception e) {
            expireDate = null;
        }
        return expireDate;
    }

    public boolean isTokenExpired(String token) {
        Date expireDate=getExpirationDate(token);
        return expireDate.before(new Date());
    }

    public static void invalidateToken(String token){
        Date expireDate = new Date();
        try {
            final Claims claims = JsonWebToken.getAllClaimsFromToken(token);
            claims.setExpiration(expireDate);
        } catch (Exception e) {
            expireDate = null;
        }
    }

    public Date getIssuedAtDateFromToken(String token) {
        Date issuedAt;
        try {
            final Claims claims = this.getAllClaimsFromToken(token);
            issuedAt = claims.getIssuedAt();
        } catch (Exception e) {
            issuedAt = null;
        }
        return issuedAt;
    }

    public String getToken( HttpServletRequest request ) {

        String authHeader = request.getHeader("Authorization");
        if ( authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }

        return null;
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
