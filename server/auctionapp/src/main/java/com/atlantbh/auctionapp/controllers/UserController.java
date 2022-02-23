package com.atlantbh.auctionapp.controllers;

import com.atlantbh.auctionapp.model.User;
import com.atlantbh.auctionapp.request.RegisterRequest;
import com.atlantbh.auctionapp.response.RegisterResponse;
import com.atlantbh.auctionapp.security.JsonWebToken;
import com.atlantbh.auctionapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/auth")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@RequestBody @Valid RegisterRequest registerRequest) {
        User user = userService.register(registerRequest);
        return ResponseEntity.ok(new RegisterResponse(user, JsonWebToken.generateJWTToken(user)));
    }
}
