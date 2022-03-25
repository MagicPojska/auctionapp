package com.atlantbh.auctionapp.projections;

import com.atlantbh.auctionapp.model.UserEntity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public interface BidProj {
    long getId();
    BigDecimal getPrice();
    LocalDateTime getBidDate();
    UserEntity getUser();
}
