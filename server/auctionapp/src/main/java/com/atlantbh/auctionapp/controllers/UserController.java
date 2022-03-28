package com.atlantbh.auctionapp.controllers;

import com.atlantbh.auctionapp.domain.model.User;
import com.atlantbh.auctionapp.request.LoginRequest;
import com.atlantbh.auctionapp.request.RegisterRequest;
import com.atlantbh.auctionapp.response.LoginResponse;
import com.atlantbh.auctionapp.security.JwtUtil;
import com.atlantbh.auctionapp.service.AuthService;
import com.atlantbh.auctionapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
@RequestMapping("/auth")
public class UserController {

    private final AuthService authService;
    private final UserService userService;
    private final JwtUtil jwtUtil;

    @Autowired
    public UserController(AuthService authService, JwtUtil jwtUtil, UserService userService) {
        this.authService = authService;
        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<LoginResponse> register(@RequestBody @Valid RegisterRequest registerRequest) {
        User user = authService.register(registerRequest);
        return ResponseEntity.ok(new LoginResponse(user, jwtUtil.generateToken(user)));

    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody @Valid LoginRequest loginRequest) throws Exception{
        try {
            authService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());
            final UserDetails userDetails = userService.loadUserByUsername(loginRequest.getEmail());

            User user = authService.login(loginRequest);
            return ResponseEntity.ok(new LoginResponse(user, jwtUtil.generateToken(userDetails)));
        } catch (AuthenticationException authExc) {
            throw new RuntimeException("Invalid Login Credentials");
        }
    }

    @GetMapping("/logout")
    public void logout(HttpServletRequest request) {
        authService.logout(request);
    }
}