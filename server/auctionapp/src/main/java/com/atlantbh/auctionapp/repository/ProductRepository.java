package com.atlantbh.auctionapp.repository;

import com.atlantbh.auctionapp.model.ProductEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
    Page<ProductEntity> findAllByEndDateIsAfter(LocalDateTime time ,Pageable paging);
    Page<ProductEntity> findAllByCategoryIdInAndStartPriceBetweenAndEndDateIsAfter(long[] categoryId, BigDecimal lowPrice, BigDecimal highPrice, LocalDateTime time, Pageable paging);
    ProductEntity findProductById(long id);
}
