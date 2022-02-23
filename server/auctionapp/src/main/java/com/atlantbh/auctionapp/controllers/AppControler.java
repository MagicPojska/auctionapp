package com.atlantbh.auctionapp.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class AppControler {
    @GetMapping
    public String welcome() {
        return "Hello Spring Security!";
    }
}
