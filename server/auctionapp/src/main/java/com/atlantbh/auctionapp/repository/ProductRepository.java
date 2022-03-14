package com.atlantbh.auctionapp.repository;

import com.atlantbh.auctionapp.model.ProductEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
    Page<ProductEntity> findAllByCategoryIdIn(long[] categoryId, Pageable paging);
}
