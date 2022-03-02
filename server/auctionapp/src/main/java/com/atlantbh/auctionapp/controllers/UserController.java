package com.atlantbh.auctionapp.controllers;

import com.atlantbh.auctionapp.model.User;
import com.atlantbh.auctionapp.request.LoginRequest;
import com.atlantbh.auctionapp.request.RegisterRequest;
import com.atlantbh.auctionapp.response.LoginResponse;
import com.atlantbh.auctionapp.response.LogoutResponse;
import com.atlantbh.auctionapp.security.JwtUtil;
import com.atlantbh.auctionapp.security.JwtUserDetailsService;
import com.atlantbh.auctionapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
@RequestMapping("/auth")
public class UserController {
    @Autowired
    private JwtUserDetailsService userServiceDetails;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;


    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid RegisterRequest registerRequest) {
        String user = userService.register(registerRequest);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody @Valid LoginRequest loginRequest) throws Exception{
        try {
            userService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());
            final UserDetails userDetails = userServiceDetails.loadUserByUsername(loginRequest.getEmail());

            User user = userService.login(loginRequest);
            return ResponseEntity.ok(new LoginResponse(user, jwtUtil.generateToken(userDetails)));
        } catch (AuthenticationException authExc) {
            throw new RuntimeException("Invalid Login Credentials");
        }
    }

    @GetMapping("/logout")
    public ResponseEntity<LogoutResponse> logout(HttpServletRequest request) {
        String message = userService.logout(request);
        return ResponseEntity.ok(new LogoutResponse(message));
    }

}