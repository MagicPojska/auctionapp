package com.atlantbh.auctionapp.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class PaymentRequest {
    @NotBlank
    long productId;

    @NotBlank
    long userId;

    @NotNull
    private UpdateCardRequest card;
}
