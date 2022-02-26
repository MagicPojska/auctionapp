package com.atlantbh.auctionapp.controllers;

import com.atlantbh.auctionapp.model.User;
import com.atlantbh.auctionapp.request.LoginRequest;
import com.atlantbh.auctionapp.request.LogoutRequest;
import com.atlantbh.auctionapp.request.RegisterRequest;
import com.atlantbh.auctionapp.response.LoginResponse;
import com.atlantbh.auctionapp.response.LogoutResponse;
import com.atlantbh.auctionapp.response.RegisterResponse;
import com.atlantbh.auctionapp.security.JwtUtil;
import com.atlantbh.auctionapp.security.JwtUserDetailsService;
import com.atlantbh.auctionapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public ResponseEntity<RegisterResponse> register(@RequestBody @Valid RegisterRequest registerRequest) {
        User user = userService.register(registerRequest);
        return ResponseEntity.ok(new RegisterResponse(user, JwtUtil.generateJWTToken(user)));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody @Valid LoginRequest loginRequest) throws Exception{
        try {
            authenticate(loginRequest.getEmail(), loginRequest.getPassword());

            final UserDetails userDetails = userServiceDetails.loadUserByUsername(loginRequest.getEmail());

            User user = userService.login(loginRequest);
            return ResponseEntity.ok(new LoginResponse(user, jwtUtil.generateToken(userDetails)));
        } catch (AuthenticationException authExc) {
            throw new RuntimeException("Invalid Login Credentials");
        }
    }


    @PostMapping("/logout")
    public ResponseEntity<LogoutResponse> logout(@RequestBody @Valid LogoutRequest logoutRequest) {
        String message = userService.logout(logoutRequest);
        return ResponseEntity.ok(new LogoutResponse(message));
    }

    private void authenticate(String email, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
}