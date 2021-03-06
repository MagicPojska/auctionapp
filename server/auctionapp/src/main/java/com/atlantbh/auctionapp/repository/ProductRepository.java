package com.atlantbh.auctionapp.repository;

import com.atlantbh.auctionapp.model.ProductEntity;
import com.atlantbh.auctionapp.projections.PriceRangeProj;
import com.atlantbh.auctionapp.projections.ProductNameProj;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.validation.constraints.Positive;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
    Page<ProductEntity> findAllByEndDateIsAfterAndStartDateIsBefore(LocalDateTime date , LocalDateTime time, Pageable paging);
    Page<ProductEntity> findAllByCategoryIdInAndStartPriceBetweenAndEndDateIsAfterAndStartDateIsBeforeAndProductNameContainingIgnoreCase(ArrayList<Long> categoryId, @Positive double startPrice, @Positive double startPrice2, LocalDateTime endDate, LocalDateTime time, String searchTerm, Pageable pageable);
    ProductEntity findProductById(long id);
    List<ProductEntity> findAllByUserIdAndEndDateIsAfter(long userId, LocalDateTime time, Sort sort);
    List<ProductEntity> findAllByUserIdAndEndDateIsBefore(long userId, LocalDateTime time, Sort sort);
    List<ProductNameProj> findAllByEndDateIsAfterAndStartDateIsBefore(LocalDateTime endDate, LocalDateTime time);
    List<ProductEntity> findTop3ByCategoryIdAndIdNotAndEndDateIsAfterAndStartDateIsBefore(long categoryId, long productId, LocalDateTime endDate, LocalDateTime time);
    List<ProductEntity> findAllByEndDateBeforeAndEndDateAfterAndSoldFalse(LocalDateTime endDate, LocalDateTime time);

    @Query(value = "SELECT MAX(start_price), MIN(start_price)" +
            "FROM auction.product", nativeQuery = true)
    PriceRangeProj getPriceRange();

}
