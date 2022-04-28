package com.atlantbh.auctionapp.repository;

import com.atlantbh.auctionapp.model.CardEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardRepository extends JpaRepository<CardEntity, Long> {
    CardEntity findByUserId(Long userId);
}
