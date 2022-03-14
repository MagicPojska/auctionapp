package com.atlantbh.auctionapp.repository;

import com.atlantbh.auctionapp.model.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
}
