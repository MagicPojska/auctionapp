package com.atlantbh.auctionapp.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class UpdateUserRequest {
    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    @NotBlank(message = "Field can't be empty")
    @Email(message = "Email format is not valid")
    private String email;

    private String phone;
    private Date dateOfBirth;
    private String address;
    private String city;

    @javax.validation.constraints.Size(max = 32)
    private String zipCode;

    private String state;
    private String country;
    private String profileImage;

    private UpdateCardRequest card;
}
