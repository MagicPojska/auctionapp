package com.atlantbh.auctionapp.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.*;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ProductRequest {
    @NotBlank
    @Size(max = 100)
    private String productName;

    @Size(max = 700)
    private String description;

    @Positive
    private double startPrice;

    @NotEmpty
    private LocalDateTime startDate;

    @NotEmpty
    private LocalDateTime endDate;

    @NotBlank
    private String images;

    @NotBlank
    private String address;

    @NotBlank
    private String city;

    @NotBlank
    @javax.validation.constraints.Size(max = 32)
    private String zipCode;

    @NotBlank
    private String country;

    @NotBlank
    @javax.validation.constraints.Size(max = 32)
    private String phone;

    @NotEmpty
    private long userId;

    @NotEmpty
    private long categoryId;
}
