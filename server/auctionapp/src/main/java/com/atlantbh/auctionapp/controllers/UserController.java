package com.atlantbh.auctionapp.controllers;

import com.atlantbh.auctionapp.model.UserEntity;
import com.atlantbh.auctionapp.request.UpdateUserRequest;
import com.atlantbh.auctionapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PutMapping("/update")
    public ResponseEntity<UserEntity> updateUser(@RequestBody @Valid UpdateUserRequest updateUserRequest) {
        UserEntity user = userService.updateUser(updateUserRequest);

        return new ResponseEntity<>(user, new HttpHeaders(), HttpStatus.OK);
    }

    @GetMapping("/deactivate")
    public ResponseEntity deactivateUser(@RequestParam("userId") Long userId) {
        userService.deactivateUser(userId);

        return new ResponseEntity<>(new HttpHeaders(), HttpStatus.OK);
    }

}
