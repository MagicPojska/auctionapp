package com.atlantbh.auctionapp.repository;

import com.atlantbh.auctionapp.model.ProductEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
    Page<ProductEntity> findAllByCategoryId(long categoryId, Pageable paging);
}
