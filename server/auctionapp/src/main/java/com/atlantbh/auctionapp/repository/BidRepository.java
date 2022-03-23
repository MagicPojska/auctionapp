package com.atlantbh.auctionapp.repository;

import com.atlantbh.auctionapp.model.BidsEntity;
import com.atlantbh.auctionapp.projections.BidProj;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

public interface BidRepository extends JpaRepository<BidsEntity, Long> {
    List<BidProj> findAllByProductId(long productId);

    @Query(value = "SELECT MAX(price) FROM auction.bids b " +
            "WHERE b.product_id = :product_id", nativeQuery = true)
    Double getMaxBidFromProduct(@Param("product_id") Long productId);
}
