package com.atlantbh.auctionapp.response;

import com.atlantbh.auctionapp.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class LoginResponse {
    private User user;
    private String token;
}
