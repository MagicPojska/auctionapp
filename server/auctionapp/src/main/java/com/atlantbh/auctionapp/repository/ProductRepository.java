package com.atlantbh.auctionapp.repository;

import com.atlantbh.auctionapp.model.ProductEntity;
import com.atlantbh.auctionapp.projections.PriceRangeProj;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
    Page<ProductEntity> findAllByEndDateIsAfter(LocalDateTime time ,Pageable paging);
    Page<ProductEntity> findAllByCategoryIdInAndStartPriceBetweenAndEndDateIsAfter(long[] categoryId, double lowPrice, double highPrice, LocalDateTime time, Pageable paging);
    ProductEntity findProductById(long id);
    List<ProductEntity> findAllByUserIdAndEndDateIsAfter(long userId, LocalDateTime time, Sort sort);
    List<ProductEntity> findAllByUserIdAndEndDateIsBefore(long userId, LocalDateTime time, Sort sort);

    @Query(value = "SELECT MAX(start_price), MIN(start_price)" +
            "FROM auction.product", nativeQuery = true)
    PriceRangeProj getPriceRange();

}
