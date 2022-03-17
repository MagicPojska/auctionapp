package com.atlantbh.auctionapp.repository;

import com.atlantbh.auctionapp.model.BidsEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BidRepository extends JpaRepository<BidsEntity, Long> {
}
