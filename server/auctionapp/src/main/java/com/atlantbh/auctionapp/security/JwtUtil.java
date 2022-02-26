package com.atlantbh.auctionapp.security;

import com.atlantbh.auctionapp.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.security.core.userdetails.UserDetails;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {

    private static String appName;
    private static String jwtSecret;
    private static int jwtExpiration;
    private static SignatureAlgorithm SIGNATURE_ALGORITHM = SignatureAlgorithm.HS256;

    @Value("${app.appName}")
    public void setAppName(String appName) {
        JwtUtil.appName = appName;
    }

    @Value("${app.jwtSecret}")
    public void setJwtSecret(String jwtSecret) {
        JwtUtil.jwtSecret = jwtSecret;
    }

    @Value("${app.jwtExpiration}")
    public void setJwtExpiration(int jwtExpiration) {
        JwtUtil.jwtExpiration = jwtExpiration;
    }

    private static Date generateExpirationDate() {
        return new Date(new Date().getTime() + JwtUtil.jwtExpiration * 1000);
    }

    //retrieve email from jwt token
    public String getEmailFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    //retrieve expiration date from jwt token
    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
    }

    //check if the token has expired
    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    //generate token for user
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return doGenerateToken(claims, userDetails.getUsername());
    }

    public void invalidateToken(String token){
        Date expireDate = new Date();
        try {
            final Claims claims = getAllClaimsFromToken(token);
            claims.setExpiration(expireDate);
        } catch (Exception e) {
            expireDate = null;
        }
    }

    private String doGenerateToken(Map<String, Object> claims, String subject) {

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(generateExpirationDate())
                .signWith(SIGNATURE_ALGORITHM, jwtSecret)
                .compact();
    }

    //validate token
    public Boolean validateToken(String token, UserDetails user) {
        final String email = getEmailFromToken(token);
        return (email.equals(user.getUsername()) && !isTokenExpired(token));
    }

}
