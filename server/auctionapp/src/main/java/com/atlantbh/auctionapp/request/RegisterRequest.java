package com.atlantbh.auctionapp.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    @NotBlank(message = "Field can't be empty")
    private String firstName;

    @NotBlank(message = "Field can't be empty")
    private String lastName;

    @NotBlank(message = "Field can't be empty")
    private String email;

    @NotBlank(message = "Field can't be empty")
    private String password;
}
