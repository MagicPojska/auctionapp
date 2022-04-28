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
}
