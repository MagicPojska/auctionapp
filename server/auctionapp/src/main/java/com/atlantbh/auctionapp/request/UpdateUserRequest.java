package com.atlantbh.auctionapp.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class UpdateUserRequest {
    @NotBlank(message = "Field can't be empty")
    private String firstName;

    @NotBlank(message = "Field can't be empty")
    private String lastName;

    @NotBlank(message = "Field can't be empty")
    @Email(message = "Email format is not valid")
    private String email;

    @NotBlank(message = "Field can't be empty")
    private String phone;

    private Date dateOfBirth;

    @NotBlank(message = "Field can't be empty")
    private String address;

    @NotBlank(message = "Field can't be empty")
    private String city;

    @NotBlank(message = "Field can't be empty")
    @javax.validation.constraints.Size(max = 32)
    private String zipCode;

    @NotBlank(message = "Field can't be empty")
    private String state;

    @NotBlank(message = "Field can't be empty")
    private String country;

    @NotBlank(message = "Field can't be empty")
    private String profileImage;
}
