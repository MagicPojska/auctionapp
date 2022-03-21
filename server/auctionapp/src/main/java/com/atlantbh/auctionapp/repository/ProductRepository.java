package com.atlantbh.auctionapp.repository;

import com.atlantbh.auctionapp.model.ProductEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigDecimal;

public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
    Page<ProductEntity> findAllByCategoryIdInAndStartPriceBetween(long[] categoryId, BigDecimal lowPrice, BigDecimal highPrice, Pageable paging);

    ProductEntity findProductById(long id);
}
