package com.atlantbh.auctionapp.service;

import com.atlantbh.auctionapp.domain.model.User;
import com.atlantbh.auctionapp.exceptions.ConflictException;
import com.atlantbh.auctionapp.model.UserEntity;
import com.atlantbh.auctionapp.repository.UserRepository;
import com.atlantbh.auctionapp.request.LoginRequest;
import com.atlantbh.auctionapp.request.RegisterRequest;
import com.atlantbh.auctionapp.security.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jsonWebToken;
    private final AuthenticationManager authenticationManager;

    Logger logger = LoggerFactory.getLogger(AuthService.class);

    public final String AUTHORIZATION = "Authorization";
    public final String BEARER = "Bearer ";

    @Autowired
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jsonWebToken, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jsonWebToken = jsonWebToken;
        this.authenticationManager = authenticationManager;
    }

    public User register(RegisterRequest registerRequest) throws ConflictException {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            logger.error("User with email: " + registerRequest.getEmail() + " already exists");
            throw new ConflictException("Email is already in use.");
        }
        UserEntity entity = new UserEntity(
                registerRequest.getFirstName(),
                registerRequest.getLastName(),
                registerRequest.getEmail(),
                passwordEncoder.encode(registerRequest.getPassword()),
                null,
                null,
                null,
                null,
                null);

        userRepository.save(entity);

        entity.setPassword(null);
        return User.createFromEntity(entity);
    }

    public User login(LoginRequest loginRequest) {
        UserEntity entity = userRepository.findByEmail(loginRequest.getEmail());
        entity.setPassword(null);

        return User.createFromEntity(entity);
    }

    public void logout(HttpServletRequest request){
        final String requestTokenHeader = request.getHeader(AUTHORIZATION);
        String token = null;

        if (requestTokenHeader != null && requestTokenHeader.startsWith(BEARER)) {
            token = requestTokenHeader.substring(BEARER.length());
        }

        jsonWebToken.invalidateToken(token);
    }

    public void authenticate(String email, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }

}
