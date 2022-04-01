package com.atlantbh.auctionapp.projections;

import com.atlantbh.auctionapp.model.UserEntity;

import java.time.LocalDateTime;

public interface BidProj {
    long getId();
    double getPrice();
    LocalDateTime getBidDate();
    UserEntity getUser();
}
