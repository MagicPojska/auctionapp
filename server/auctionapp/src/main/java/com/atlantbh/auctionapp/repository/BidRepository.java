package com.atlantbh.auctionapp.repository;

import com.atlantbh.auctionapp.model.BidsEntity;
import com.atlantbh.auctionapp.projections.BidProj;
import com.atlantbh.auctionapp.projections.HighestBidderProj;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BidRepository extends JpaRepository<BidsEntity, Long> {
    Page<BidProj> findAllByProductId(long productId, Pageable paging);
    List<BidsEntity> findAllByUserId(long userId, Sort sort);

    @Query(value = "SELECT MAX(price) FROM auction.bids b " +
            "WHERE b.product_id = :product_id", nativeQuery = true)
    Double getMaxBidFromProduct(@Param("product_id") Long productId);

    @Query(value = "SELECT u.id, MAX(b.price) " +
            "FROM auction.user u " +
            "INNER JOIN auction.bids b ON u.id = b.user_id " +
            "INNER JOIN auction.product p ON p.id = b.product_id " +
           "WHERE p.id = :product_id " +
            "GROUP BY u.id", nativeQuery = true)
    HighestBidderProj getHighestBidder(@Param("product_id") Long productId);
}
