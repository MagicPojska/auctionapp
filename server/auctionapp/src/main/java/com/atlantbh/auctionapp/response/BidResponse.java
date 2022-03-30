package com.atlantbh.auctionapp.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class BidResponse {
    private double bid;
    private Integer numberOfBids;
}
