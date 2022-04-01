package com.atlantbh.auctionapp.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotNull;

@AllArgsConstructor
@Getter
public class BidRequest {
    @NotNull(message = "User ID is required")
    private long userId;
    @NotNull(message = "Product ID is required")
    private long productId;
    @NotNull(message = "Price is required")
    private double price;
}
