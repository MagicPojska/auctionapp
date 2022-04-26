package com.atlantbh.auctionapp.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class PaymentRequest {
    private String email;
    private String id;

    @NotBlank
    long productId;

    @NotBlank
    long userId;
}
