package com.atlantbh.auctionapp.response;

import com.atlantbh.auctionapp.model.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
public class RegisterResponse {
    private User user;
    private String token;

    public RegisterResponse(User user, String token) {
        this.user = user;
        this.token = token;
    }
}
