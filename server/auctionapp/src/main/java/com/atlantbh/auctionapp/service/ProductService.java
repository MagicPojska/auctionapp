package com.atlantbh.auctionapp.service;

import com.atlantbh.auctionapp.exceptions.NotFoundException;
import com.atlantbh.auctionapp.model.ProductEntity;
import com.atlantbh.auctionapp.model.enums.SortBy;
import com.atlantbh.auctionapp.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;


@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public Page<ProductEntity> getAllProducts(Integer pageNumber, Integer pageSize, String sortBy){
        Sort sortOrder;
        LocalDateTime time = LocalDateTime.now();
        if (sortBy.equals(SortBy.START_DATE.getSort())){
            sortOrder = Sort.by(sortBy).descending();
        } else {
            sortOrder = Sort.by(sortBy);
        }
        Pageable paging = PageRequest.of(pageNumber, pageSize, sortOrder);

        Page<ProductEntity> pagedResult = productRepository.findAllByEndDateIsAfter(time, paging);

        return pagedResult;
    }

    public Page<ProductEntity> getAllProductsFromCategory(Integer pageNumber, Integer pageSize, long[] categoryId, BigDecimal lowPrice, BigDecimal highPrice){
        LocalDateTime time = LocalDateTime.now();
        Pageable paging = PageRequest.of(pageNumber, pageSize, Sort.by("category_id"));
        Page<ProductEntity> productsList = productRepository.findAllByCategoryIdInAndStartPriceBetweenAndEndDateIsAfter(categoryId, lowPrice, highPrice, time, paging );

        return productsList;
    }

    public ProductEntity getProductById(long id){
        ProductEntity product = productRepository.findProductById(id);
        if(product == null){
            throw new NotFoundException("Product with id:" + id + " does not exist");
        }
        return product;
    }

}
