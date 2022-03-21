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

    @Query(value = "SELECT MAX(price) FROM auction.bids b INNER JOIN auction.user u on b.id = b.user_id " +
            "WHERE b.user_id = :user_id AND b.product_id = :product_id", nativeQuery = true)
    BigDecimal getMaxBidFromPersonForProduct(@Param("user_id") Long userId, @Param("product_id") Long productId);
}
